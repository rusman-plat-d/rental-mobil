import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SewaTableDataSource } from './_sewa-view-table.datasource';

import { Sewa } from '../../interfaces/sewa.interface';

export interface DetailRow {
  detailRow: boolean;
  data: Sewa;
}

export class SewaTableDetailDataSource extends DataSource<Sewa|DetailRow> {
	constructor(private _UserDataSource: SewaTableDataSource) {
		super();
	}
	connect(): Observable<(Sewa|DetailRow)[]> {
		return this._UserDataSource.connect().map(data => {
			const rows: (Sewa|DetailRow)[] = [];
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
