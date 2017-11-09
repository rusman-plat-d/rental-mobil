import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserTableDataSource } from './_user-view-table.datasource';

import {User} from '../../interfaces/user.interface';

export interface DetailRow {
  detailRow: boolean;
  data: User;
}

export class UserTableDetailDataSource extends DataSource<User|DetailRow> {
	constructor(private _UserDataSource: UserTableDataSource) {
		super();
	}
	connect(): Observable<(User|DetailRow)[]> {
		return this._UserDataSource.connect().map(data => {
			const rows: (User|DetailRow)[] = [];
			// Interweave a detail data object for each row data object that will be used for displaying
			// row details. Contains the row data.
			data.forEach(user => rows.push(user, {detailRow: true, data: user}));
			return rows;
		});
	}

	disconnect() {
		// No-op
	}
}
