import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';
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
	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	// displayedColumns: PenggunaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: PenggunaProperties[] = ['image', 'nama', 'noHP', 'email', 'action'];

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedPengguna: Pengguna;
	wasExpanded = new Set<Pengguna>();

	isDetailRow = (_index: number, row: DetailRow | Pengguna) => row.hasOwnProperty('detailRow');
	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public _database: DatabaseService,
		public $_pp2Conf: ConfigService
	) {
		_database.init<Pengguna>(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/gets', 'pengguna');
		// Possible useful example for the open and closeAll events.
		// Adding a class to the body if a dialog opens and
		// removing it after all open dialogs are closed
		$_matDialog.afterOpen.subscribe(() => {
			if (!doc.body.classList.contains('no-scroll'))
				doc.body.classList.add('no-scroll');
		});
		$_matDialog.afterAllClosed.subscribe(() => {
			doc.body.classList.remove('no-scroll');
		});
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
					this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/delete/' + id)
						.subscribe((res: {success: boolean}) => {
							if (res.success) {
								this._database.dataChange.next(
									this._database.data.filter((pengguna: Pengguna) => pengguna.id !== id)
								)
							}
						})
				}
				this.dialogRef.close()
				this.dialogRef = null;
			})
	}
}
