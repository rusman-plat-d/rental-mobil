import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Mobil} from '../../interfaces/mobil.interface';

import 'rxjs/add/operator/map';
import { MobilDataSource } from './_mobil-view.datasource';

export interface DetailRow {
  detailRow: boolean;
  data: Mobil;
}

export class MobilDetailDataSource extends DataSource<any> {
	constructor(private _mobilDataSource: MobilDataSource) {
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
