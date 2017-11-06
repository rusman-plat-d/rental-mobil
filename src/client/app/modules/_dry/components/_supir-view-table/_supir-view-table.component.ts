import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, transition, trigger, state, style, } from '@angular/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { Supir } from '../../interfaces/supir.interface';
import { SupirTableDatabase } from './_supir-view-table.database';
import { SupirTableDataSource } from './_supir-view-table.datasource';
import { DetailRow, SupirTableDetailDataSource } from './_supir-view-table.detail.datasource';

import { ConfigService } from '../../services/config.service';

export type SupirProperties = 'id' | 'nama' | 'noSim' | 'jk' | 'noHP' | 'alamat' | 'email' | 'image' | '_status' | '_disewaSampai' | 'createdAt' | 'updatedAt' | 'action' | undefined;

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
	@ViewChild(_NavComponent) C_Pp2_Dry_Nav: _NavComponent;
	
	dataSource: SupirTableDataSource | null;
	dataSourceWithDetails: SupirTableDetailDataSource | null;
	// displayedColumns: SupirProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt'];
	displayedColumns: SupirProperties[] = ['image', 'nama', 'jk', '_status', 'action'];
	changeReferences = false;
	wasExpanded = new Set<Supir>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSupir: Supir;

	isDetailRow = (row: DetailRow|Supir) => row.hasOwnProperty('detailRow');
	constructor(
		public $_ngRouter: Router,
		public supirDatabase: SupirTableDatabase,
		public $_pp2Conf: ConfigService
	) {}
	ngAfterViewInit(){
		this.C_Pp2_Dry_Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnDestroy(){}
	ngOnInit() {
		this.dataSource = new SupirTableDataSource(this.supirDatabase, this.C_mat_paginator, this.C_mat_sort)
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
	remove(id) {
		this.supirDatabase.$Socket.emit('remove', id)
	}
}
