import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Supir} from '../../interfaces/supir.interface';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { SupirTableDataSource } from './_supir-view-table.datasource';

export interface DetailRow {
  detailRow: boolean;
  data: Supir;
}

export class SupirTableDetailDataSource extends DataSource<Supir|DetailRow> {
	constructor(private _supirDataSource: SupirTableDataSource) {
		super();
	}
	connect(): Observable<(Supir|DetailRow)[]> {
		return this._supirDataSource.connect().map(data => {
			const rows: (Supir|DetailRow)[] = [];
			// Interweave a detail data object for each row data object that will be used for displaying
			// row details. Contains the row data.
			data.forEach(supir => rows.push(supir, {detailRow: true, data: supir}));
			return rows;
		});
	}

	disconnect() {
		// No-op
	}
}
