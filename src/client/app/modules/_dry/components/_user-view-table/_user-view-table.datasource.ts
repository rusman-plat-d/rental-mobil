import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {User} from '../../interfaces/user.interface';
import {UserTableDatabase} from './_user-view-table.database';

export class UserTableDataSource extends DataSource<User> {
	 _filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }
	constructor(
		private _UserDatabase: UserTableDatabase,
		private _paginator: MatPaginator
		,private _sort: MatSort
	) {
		super();
	}

	connect(): Observable<User[]> {
		const displayDataChanges = [
			this._paginator.page,
			this._sort.sortChange,
			this._UserDatabase.dataChange,
			this._filterChange
		];
		return Observable.merge(...displayDataChanges).map(() => {
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			return this.getSortedData()
				.splice(startIndex, this._paginator.pageSize)
				.filter((user: User) => {
					let searchStr = (JSON.stringify(user)).toLowerCase();
					return searchStr.indexOf(this.filter.toLowerCase()) != -1;
				})
		});
	}

	disconnect() {
		// No-op
	}

	/** Returns a sorted copy of the database data. */
	getSortedData(): User[] {
		const data = this._UserDatabase.data.slice();
		if (!this._sort.active || this._sort.direction == '') { return data; }
		return data.sort((a, b) => {
			let propertyA: number|string = '';
			let propertyB: number|string = '';
			switch (this._sort.active) {
				case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
				case 'nama': [propertyA, propertyB] = [a.nama, b.nama]; break;
				case 'noKTP': [propertyA, propertyB] = [a.noKTP, b.noKTP]; break;
				case 'noHP': [propertyA, propertyB] = [a.noHP, b.noHP]; break;
				case 'jk': [propertyA, propertyB] = [a.jk, b.jk]; break;
				case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
				case 'alamat': [propertyA, propertyB] = [a.alamat, b.alamat]; break;
				case 'image': [propertyA, propertyB] = [a.image, b.image]; break;
				case 'createdAt': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
				case 'updatedAt': [propertyA, propertyB] = [a.updatedAt, b.updatedAt]; break;
			}
			let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
			return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
		});
	}
}
