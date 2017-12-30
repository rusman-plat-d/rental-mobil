import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { Supir$Key } from '../../interfaces/supir.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

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
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	
	get length(): number {let v=0;try{this.$_pp2Database.data.length}catch(e){}return v }

	$_pp2Database: DatabaseService<Supir$Key> = new DatabaseService<Supir$Key>(this.$_ngfDatabase)
	$_pp2Upload: UploadService = new UploadService(this.$_ngfDatabase)
	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	// displayedColumns: SupirProperties[] = ['id', 'nama', 'noSim', 'noHP', 'jk', 'hargaSewa', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt'];
	displayedColumns: SupirProperties[] = ['image', 'nama', '_status'];
	supir: Supir$Key = {$key: ''};
	supirMatTableDataSource = new MatTableDataSource<Supir$Key>();

	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngRouter: Router,
		private $_ngfDatabase: AngularFireDatabase,
		public $_pp2Conf: ConfigService
	) {
		// Possible useful example for the open and closeAll events.
		// Adding a class to the body if a dialog opens and
		// removing it after all open dialogs are closed
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.$_pp2Database.table='supir';
		this.$_pp2Database.$data$.subscribe(()=>{
			this.supirMatTableDataSource!.data = this.$_pp2Database.data.slice();
		})
		this.supirMatTableDataSource.sortingDataAccessor = (supir: Supir$Key, prop: string) => {
			switch (prop) {
				case '$key': return +supir.$key;
				case 'nama': return +supir.nama;
				case 'noSIM': return +supir.noSIM;
				case 'noHP': return +supir.noHP;
				case 'jk': return +supir.jk;
				case 'hargaSewa': return +supir.hargaSewa;
				case 'alamat': return +supir.alamat;
				case 'email': return +supir.email;
				case 'image': return +supir.image;
				case '_status': return +supir._status;
				case '_disewa': return +supir._disewa;
				case '_disewaSampai': return +supir._disewaSampai;
				case 'createdAt': return +supir.createdAt;
				case 'updatedAt': return +supir.updatedAt;
				default: return '';
			}
		}
		this.supirMatTableDataSource.filterPredicate = (supir: Supir$Key, filter: string) => JSON.stringify(supir).indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.supirMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.supirMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnDestroy(){}
	ngOnInit() {
		this.supirMatTableDataSource!.data = this.$_pp2Database.data.slice();
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.supirMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	rowClick(row) {
		this.supir = this.supir == row ? null : row;
		// this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.dialogRef = this.$_matDialog.open(_KonfirmasiHapusDialogComponent, { width: '300px', disableClose: true })
		this.dialogRef.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') this.$_pp2Database.remove(id)
				this.dialogRef.close()
				this.dialogRef = null;
			})
	}
}
