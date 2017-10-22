import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, transition, trigger, state, style, } from '@angular/animations';
import { MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';

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
	
	dataSource: SupirTableDataSource | null;
	dataSourceWithDetails: SupirTableDetailDataSource | null;
	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	// displayedColumns: SupirProperties[] = ['id', 'nama', 'noSim', 'noHP', 'jk', 'hargaSewa', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt'];
	displayedColumns: SupirProperties[] = ['image', 'nama', '_status'];
	changeReferences = false;
	wasExpanded = new Set<Supir>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSupir: Supir;

	isDetailRow = (_index: number, row: DetailRow|Supir) => row.hasOwnProperty('detailRow');
	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
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
		this.dialogRef = this.$_matDialog.open(_KonfirmasiHapusDialogComponent, {
			width: '300px',
			disableClose: true,
			data: {
				jenis: 'Pengguna',
			}
		})
		this.dialogRef.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') {
					this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/supir/delete/' + id)
						.subscribe((res: {success: boolean}) => {
							if (res.success) {
								this._database.dataChange.next(
									this._database.data.filter((supir: Supir) => supir.id !== id)
								)
							}
						})
				}
				this.dialogRef.close()
				this.dialogRef = null;
			})
	}
}
