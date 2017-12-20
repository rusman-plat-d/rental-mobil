import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, transition, trigger, state, style, } from '@angular/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { Supir } from '../../interfaces/supir.interface';

import { SupirTableDataSource } from './_supir-view-table.datasource';
import { DetailRow, SupirTableDetailDataSource } from './_supir-view-table.detail.datasource';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';

export type SupirProperties = 'id' | 'nama' | 'noSim' | 'noHP' | 'jk' | 'hargaSewa' | 'alamat' | 'email' | 'image' | '_status' | '_disewaSampai' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-supirViewTable',
	templateUrl: './_supir-view-table.component.html',
	styleUrls: ['./_supir-view-table.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _SupirViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(MatPaginator) C_mat_paginator: MatPaginator;
	@ViewChild(MatSort) C_mat_sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;
	
	dataSource: SupirTableDataSource | null;
	dataSourceWithDetails: SupirTableDetailDataSource | null;
	// displayedColumns: SupirProperties[] = ['id', 'nama', 'noSim', 'noHP', 'jk', 'hargaSewa', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt'];
	displayedColumns: SupirProperties[] = ['image', 'nama', '_status', 'action'];
	changeReferences = false;
	wasExpanded = new Set<Supir>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSupir: Supir;

	isDetailRow = (_index: number, row: DetailRow|Supir) => row.hasOwnProperty('detailRow');
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public _database: DatabaseService,
		public $_pp2Conf: ConfigService
	) {
		_database.init<Supir>(this.$_pp2Conf.baseUrl + '/api/db/file/supir/gets', 'supir');
	}
	ngAfterViewInit(){}
	ngOnDestroy(){}
	ngOnInit() {
		this.dataSource = new SupirTableDataSource(this._database, this.C_mat_paginator, this.C_mat_sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new SupirTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedSupir == row) {
			this.expandedSupir = null;
		} else {
			this.expandedSupir = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/supir/delete/' + id)
	}
}
