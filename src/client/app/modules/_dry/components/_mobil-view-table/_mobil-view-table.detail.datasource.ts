import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Mobil} from '../../interfaces/mobil.interface';

import 'rxjs/add/operator/map';
import { MobilTableDataSource } from './_mobil-view-table.datasource';

export interface DetailRow {
  detailRow: boolean;
  data: Mobil;
}

export class MobilTableDetailDataSource extends DataSource<Mobil|DetailRow> {
	constructor(private _mobilDataSource: MobilTableDataSource) {
		super();
	}
	connect(): Observable<(Mobil|DetailRow)[]> {
		return this._mobilDataSource.connect().map(data => {
			const rows: (Mobil|DetailRow)[] = [];
			// Interweave a detail data object for each row data object that will be used for displaying
			// row details. Contains the row data.
			data.forEach(Mobil => rows.push(Mobil, {detailRow: true, data: Mobil}));
			return rows;
		});
	}

	disconnect() {
		// No-op
	}
}
