import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Supir} from '../../interfaces/supir.interface';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { SupirDataSource } from './_supir-view.datasource';

export interface DetailRow {
  detailRow: boolean;
  data: Supir;
}

export class SupirDetailDataSource extends DataSource<any> {
	constructor(private _supirDataSource: SupirDataSource) {
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
