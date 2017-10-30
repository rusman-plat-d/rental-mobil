import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {SupirDatabase, Supir} from './_supir-view.database';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class SupirDataSource extends DataSource<any> {
	constructor(
		private _supirDatabase: SupirDatabase,
		private _paginator: MatPaginator,
		private _sort: MatSort
	) {
		super();
	}

	connect(): Observable<Supir[]> {
		const displayDataChanges = [
		this._paginator.page,
		this._sort.sortChange,
		this._supirDatabase.dataChange
		];
		return Observable.merge(...displayDataChanges).map(() => {
		const data = this.getSortedData();
		// Grab the page's slice of data.
		const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
		return data.splice(startIndex, this._paginator.pageSize);
		});
	}

	disconnect() {
		// No-op
	}

	/** Returns a sorted copy of the database data. */
	getSortedData(): Supir[] {
		const data = this._supirDatabase.data.slice();
		if (!this._sort.active || this._sort.direction == '') { return data; }
		return data.sort((a, b) => {
			let propertyA: number|string = '';
			let propertyB: number|string = '';
			switch (this._sort.active) {
				case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
				case 'name': [propertyA, propertyB] = [a.nama, b.nama]; break;
			}
			let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
			return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
		});
	}
}
