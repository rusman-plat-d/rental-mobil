import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {User} from '../../interfaces/user.interface';

import 'rxjs/add/operator/map';
import { UserDataSource } from './_user-view.datasource';

export interface DetailRow {
  detailRow: boolean;
  data: User;
}

export class UserDetailDataSource extends DataSource<any> {
	constructor(private _UserDataSource: UserDataSource) {
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
