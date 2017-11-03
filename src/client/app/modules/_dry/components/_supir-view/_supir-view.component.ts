import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, transition, trigger, state, style, } from '@angular/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Supir } from '../../interfaces/supir.interface';
import { SupirDatabase } from './_supir-view.database';

import { SupirDataSource } from './_supir-view.datasource';
import { DetailRow, SupirDetailDataSource } from './_supir-view.detail.datasource';
import { CONFIG } from '../../consts/config.const';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

export type SupirProperties = 'id' | 'nama' | 'noSim' | 'jk' | 'noHP' | 'alamat' | 'email' | 'image' | 'action' | undefined;
export type TrackByStrategy = 'id' | 'reference' | 'index';

@Component({
	selector: 'pp2-dry-supirView',
	templateUrl: './_supir-view.component.html',
	styleUrls: ['./_supir-view.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('2000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})

export class _SupirViewComponent implements OnDestroy, OnInit {
	CONFIG = CONFIG;
	supirDatabase = new SupirDatabase();
	dataSource: SupirDataSource | null;
	dataSourceWithDetails: SupirDetailDataSource | null;
	// displayedColumns: SupirProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image'];
	displayedColumns: SupirProperties[] = ['image', 'nama', 'jk', 'action'];
	trackByStrategy: TrackByStrategy = 'reference';
	changeReferences = false;
	wasExpanded = new Set<Supir>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSupir: Supir;

	isDetailRow = (row: DetailRow|Supir) => row.hasOwnProperty('detailRow');
	@ViewChild(MatPaginator) C_mat_paginator: MatPaginator;
	@ViewChild(MatSort) C_mat_sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	constructor(
		public $_ngRouter: Router
	) {}
	ngOnDestroy(){
		this.supirDatabase.$Socket = null;
	}
	ngOnInit() {
		this.dataSource = new SupirDataSource(this.supirDatabase, this.C_mat_paginator, this.C_mat_sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new SupirDetailDataSource(this.dataSource);
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
		alert('delete');
		this.supirDatabase.$Socket.emit('remove', id)
	}
	gg(msg){
		alert('gg => ' + msg);
	}
}
