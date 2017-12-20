import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { PenggunaTableDataSource } from './_pengguna-view-table.datasource';
import { DetailRow, PenggunaTableDetailDataSource } from './_pengguna-view-table.detail.datasource';

import { Pengguna } from '../../interfaces/pengguna.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';

export type PenggunaProperties = 'id' | 'nama' | 'noKTP' | 'noHP' | 'jk' | 'email' | 'alamat' | 'image' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-penggunaViewTable',
	templateUrl: './_pengguna-view-table.component.html',
	styleUrls: ['./_pengguna-view-table.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _PenggunaViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('filter') filter: ElementRef;
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;

	changeReferences = false;
	dataSource: PenggunaTableDataSource | null;
	dataSourceWithDetails: PenggunaTableDetailDataSource | null;
	// displayedColumns: PenggunaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: PenggunaProperties[] = ['image', 'nama', 'noHP', 'email', 'action'];

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedPengguna: Pengguna;
	wasExpanded = new Set<Pengguna>();

	isDetailRow = (_index: number, row: DetailRow | Pengguna) => row.hasOwnProperty('detailRow');
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public _database: DatabaseService,
		public $_pp2Conf: ConfigService
	) {
		_database.init<Pengguna>(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/gets', 'pengguna');
	}
	ngAfterViewInit() { }
	ngOnDestroy() { }
	ngOnInit() {
		this.dataSource = new PenggunaTableDataSource(this._database, this.C_Mat_Paginator, this.C_Mat_Sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new PenggunaTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedPengguna == row) {
			this.expandedPengguna = null;
		} else {
			this.expandedPengguna = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/delete/' + id)
	}
}
