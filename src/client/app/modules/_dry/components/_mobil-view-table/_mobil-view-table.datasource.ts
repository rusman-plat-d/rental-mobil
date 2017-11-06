import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {Mobil} from '../../interfaces/mobil.interface';
import {MobilTableDatabase} from './_mobil-view-table.database';

export class MobilTableDataSource extends DataSource<Mobil> {
	 _filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }
	constructor(
		private _MobilDatabase: MobilTableDatabase,
		private _paginator: MatPaginator,
		private _sort: MatSort
	) {
		super();
	}

	connect(): Observable<Mobil[]> {
		const displayDataChanges = [
			this._paginator.page,
			this._sort.sortChange,
			this._MobilDatabase.dataChange,
			this._filterChange
		];
		return Observable.merge(...displayDataChanges).map(() => {
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			return this.getSortedData()
				.splice(startIndex, this._paginator.pageSize)
				.filter((Mobil: Mobil) => {
					let searchStr = (JSON.stringify(Mobil)).toLowerCase();
					return searchStr.indexOf(this.filter.toLowerCase()) != -1;
				})
		});
	}

	disconnect() {
		// No-op
	}

	/** Returns a sorted copy of the database data. */
	getSortedData(): Mobil[] {
		const data = this._MobilDatabase.data.slice();
		if (!this._sort.active || this._sort.direction == '') { return data; }
		return data.sort((a, b) => {
			let propertyA: number|string = '';
			let propertyB: number|string = '';
			switch (this._sort.active) {
				case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
				case 'nama': [propertyA, propertyB] = [a.nama, b.nama]; break;
				case 'platNo': [propertyA, propertyB] = [a.platNo, b.platNo]; break;
				case 'kursi': [propertyA, propertyB] = [a.kursi, b.kursi]; break;
				case 'bensin': [propertyA, propertyB] = [a.bensin, b.bensin]; break;
				case 'hargaSewa': [propertyA, propertyB] = [a.hargaSewa, b.hargaSewa]; break;
				case 'kondisi': [propertyA, propertyB] = [a.kondisi, b.kondisi]; break;
				case '_status': [propertyA, propertyB] = [a._status, b._status]; break;
			}
			let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
			return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
		});
	}
}
