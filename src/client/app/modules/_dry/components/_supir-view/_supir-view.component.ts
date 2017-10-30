import { Component, OnInit } from '@angular/core';
import { animate, transition, trigger, state, style, } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Supir, SupirDatabase } from './_supir-view.database';
import { SupirDataSource } from './_supir-view.datasource';
import { DetailRow, SupirDetailDataSource } from './_supir-view.detail.datasource';

export type SupirProperties = 'id' | 'nama' | 'noSim' | 'jk' | 'noHP' | 'alamat' | 'email' | 'image' | undefined;
export type TrackByStrategy = 'id' | 'reference' | 'index';

@Component({
	selector: 'pp2-dry-supirView',
	templateUrl: './_supir-view.component.html',
	styleUrls: [`./_supir-view.component.scss`],
	animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
		state('expanded', style({height: '*', visibility: 'visible'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
	]),
	]
})

export class _SupirViewComponent implements OnInit {
	dataSource: SupirDatabase | null;
	dataSourceWithDetails: SupirDetailDataSource | null;
	matTableDataSource = new MatTableDataSource<Supir>();
	displayedColumns: SupirProperties[] = [];
	trackByStrategy: TrackByStrategy = 'reference';
	changeReferences = false;
	highlights = new Set<string>();
	wasExpanded = new Set<Supir>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSupir: Supir;

	isDetailRow = (row: DetailRow|Supir) => row.hasOwnProperty('detailRow');
	constructor(
		_supirDatabase: SupirDatabase
	) {
		this.matTableDataSource.sortingDataAccessor = (data: Supir, property: string) => {
			switch (property) {
				case 'id': return data.id;
				case 'nama': return data.nama;
				case 'noSim': return data.noSim;
				case 'jk': return data.jk;
				case 'noHP': return data.noHP;
				case 'alamat': return data.alamat;
				case 'email': return data.email;
				case 'image': return data.image;
				default: return '';
			}
		};
		this.matTableDataSource.filterTermAccessor = (data: Supir) => data.nama;
		// this.filter.valueChanges.subscribe(filter => this.matTableDataSource!.filter = filter);
	}

	ngOnInit() { }
}
