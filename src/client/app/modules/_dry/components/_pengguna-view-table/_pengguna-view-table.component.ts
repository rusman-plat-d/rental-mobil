import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { Pengguna, PenggunaId } from '../../interfaces/pengguna.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

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
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;

	get length(): number {return this._database.data.length; }

	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	// displayedColumns: PenggunaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: PenggunaProperties[] = ['image', 'nama', 'noHP'];
	pengguna: PenggunaId = {id: ''};
	penggunaMatTableDataSource = new MatTableDataSource<PenggunaId>();

	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngRouter: Router,
		public _database: DatabaseService<PenggunaId>,
		public $_pp2Conf: ConfigService,
		public $_pp2Upload: UploadService
	) {
		// Possible useful example for the open and closeAll events.
		// Adding a class to the body if a dialog opens and
		// removing it after all open dialogs are closed
		$_matDialog.afterOpen.subscribe(() => {
			if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll');
		});
		$_matDialog.afterAllClosed.subscribe(() => {
			doc.body.classList.remove('no-scroll');
		});
		_database.table='pengguna';
		this.penggunaMatTableDataSource.sortingDataAccessor = (pengguna: PenggunaId, prop: string) => {
			switch (prop) {
				case 'id': return +pengguna.id;
				case 'nama': return +pengguna.nama;
				case 'nokTP': return +pengguna.noKTP;
				case 'noHP': return +pengguna.noHP;
				case 'jk': return +pengguna.jk;
				case 'email': return +pengguna.email;
				case 'alamat': return +pengguna.alamat;
				case 'image': return +pengguna.image;
				case 'createdAt': return +pengguna.createdAt;
				case 'updatedAt': return +pengguna.updatedAt;
				default: return '';
			}
		}
		this.penggunaMatTableDataSource.filterPredicate = (pengguna: PenggunaId, filter: string) => JSON.stringify(pengguna).indexOf(filter) != -1;
	}
	ngAfterViewInit() {
		this.penggunaMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.penggunaMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnDestroy() {
		this._database = null;
	}
	ngOnInit() {
		this.penggunaMatTableDataSource!.data = this._database.data.slice();
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.penggunaMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	rowClick(row) {
		this.pengguna = this.pengguna == row ? null : row;
		// this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
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
				if (res === 'O') this._database.remove(id)
				this.dialogRef.close()
				this.dialogRef = null;
			})
	}
}
