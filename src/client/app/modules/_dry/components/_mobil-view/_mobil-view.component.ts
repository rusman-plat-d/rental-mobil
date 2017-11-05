import { Component, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Mobil } from '../../interfaces/mobil.interface';
import { MobilDatabase } from './_mobil-view.database';
import { MobilDataSource } from './_mobil-view.datasource';
import { DetailRow, MobilDetailDataSource } from './_mobil-view.detail.datasource';

import { ConfigService } from '../../services/config.service';
import { TableExpand } from '../../animations/table-expand.animation';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

export type MobilProperties = 'id' | 'nama' | 'platNo' | 'kursi' | 'bensin' | 'hargaSewa' | 'image' | 'kondisi' | '_status' | '_disewaSampai' | 'createdAt' | 'updatedAt' | 'action' | undefined;
export type TrackByStrategy = 'id' | 'reference' | 'index';

@Component({
	selector: 'pp2-dry-mobilView',
	templateUrl: './_mobil-view.component.html',
	styleUrls: ['./_mobil-view.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _MobilViewComponent implements OnDestroy, OnInit {
	dataSource: MobilDataSource | null;
	dataSourceWithDetails: MobilDetailDataSource | null;
	// displayedColumns: MobilProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: MobilProperties[] = ['image', 'nama', 'hargaSewa', '_status', 'action'];
	trackByStrategy: TrackByStrategy = 'reference';
	changeReferences = false;
	wasExpanded = new Set<Mobil>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedMobil: Mobil;

	isDetailRow = (row: DetailRow|Mobil) => row.hasOwnProperty('detailRow');
	@ViewChild(MatPaginator) C_mat_paginator: MatPaginator;
	@ViewChild(MatSort) C_mat_sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	constructor(
		public $_ngRouter: Router,
		public MobilDatabase: MobilDatabase,
		public $_pp2Conf: ConfigService
	) {}
	ngOnDestroy(){
		this.MobilDatabase.$Socket = null;
	}
	ngOnInit() {
		this.dataSource = new MobilDataSource(this.MobilDatabase, this.C_mat_paginator, this.C_mat_sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new MobilDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedMobil == row) {
			this.expandedMobil = null;
		} else {
			this.expandedMobil = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id) {
		alert('delete');
		this.MobilDatabase.$Socket.emit('remove', id)
	}
}
