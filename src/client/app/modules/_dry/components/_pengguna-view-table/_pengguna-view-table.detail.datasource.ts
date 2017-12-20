import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PenggunaTableDataSource } from './_pengguna-view-table.datasource';

import {Pengguna} from '../../interfaces/pengguna.interface';

export interface DetailRow {
  detailRow: boolean;
  data: Pengguna;
}

export class PenggunaTableDetailDataSource extends DataSource<Pengguna|DetailRow> {
	constructor(private _PenggunaDataSource: PenggunaTableDataSource) {
		super();
	}
	connect(): Observable<(Pengguna|DetailRow)[]> {
		return this._PenggunaDataSource.connect().map(data => {
			const rows: (Pengguna|DetailRow)[] = [];
			// Interweave a detail data object for each row data object that will be used for displaying
			// row details. Contains the row data.
			data.forEach(pengguna => rows.push(pengguna, {detailRow: true, data: pengguna}));
			return rows;
		});
	}

	disconnect() {
		// No-op
	}
}
