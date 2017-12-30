import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { TableExpand } from '../../animations/table-expand.animation';

import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';

import { Mobil$Key, Pengguna$Key, Sewa$Key, Supir$Key } from '../../interfaces/sewa.interface';

import { DatabaseService } from '../../services/database.service';

export type SewaProperties = 'id' | 'nama' | 'noKTP' | 'noHP' | 'jk' | 'email' | 'alamat' | 'image' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-sewaViewTable',
	templateUrl: './_sewa-view-table.component.html',
	styleUrls: ['./_sewa-view-table.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _SewaViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get data(){ return this.dataChange.value; }
	get length(){ return this.$_pp2SewaDatabase.data.length || 0; }

	$_pp2MobilDatabase: DatabaseService<Mobil$Key> = new DatabaseService<Mobil$Key>(this.$_ngfDatabase);;
	$_pp2PenggunaDatabase: DatabaseService<Pengguna$Key> = new DatabaseService<Pengguna$Key>(this.$_ngfDatabase);;
	$_pp2SupirDatabase: DatabaseService<Supir$Key> = new DatabaseService<Supir$Key>(this.$_ngfDatabase);;
	$_pp2SewaDatabase: DatabaseService<Sewa$Key> = new DatabaseService<Sewa$Key>(this.$_ngfDatabase);;
	dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
	// displayedColumns: SewaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	displayedColumns: string[] = ['u_nama', 'm_nama', 's_nama', '_s_hari', '_s_hargaTotal', 'action'];
	expandedSewa: Sewa$Key;
	wasExpanded = new Set<Sewa$Key>();
	level = this.$_ngActivatedRoute.data['value']['type'];
	pengguna;
	sewaMatTableDataSource = new MatTableDataSource<Sewa$Key>();

	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngRouter: Router,
		private $_ngfDatabase: AngularFireDatabase
	) {
		// Possible useful example for the open and closeAll events.
		// Adding a class to the body if a dialog opens and
		// removing it after all open dialogs are closed
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.$_pp2MobilDatabase.table = 'mobil';
		this.$_pp2PenggunaDatabase.table = 'pengguna';
		this.$_pp2SupirDatabase.table = 'supir';
		this.$_pp2SewaDatabase.table = 'sewa';
		this.dataChange.subscribe(() => {
			this.sewaMatTableDataSource!.data = this.$_pp2SewaDatabase.data.slice();
		})
		this.sewaMatTableDataSource.sortingDataAccessor = (sewa: Sewa$Key, prop: string) => {
			switch (prop) {
				case 'u_nama': return +sewa.pengguna.nama;
				case 'm_nama': return +sewa.mobil.nama;
				case 's_nama': return +sewa.supir.nama;
				case '_s_hari': return +sewa.totalSewaHari;
				case '_s_hargaTotal': return +sewa.totalSewa;
				default: return '';
			}
		}
		this.sewaMatTableDataSource.filterPredicate = (supir: Supir$Key, filter: string) => JSON.stringify(supir).indexOf(filter) != -1;
		this.$_pp2SewaDatabase.$data$.subscribe(($Sewa: Sewa$Key[]) => {
			setTimeout(() => {
				let _Sewa: Sewa$Key[] = $Sewa;
				for ( let i in _Sewa ) {
					_Sewa[i].mobil = this.$_pp2MobilDatabase.data.filter((Mobil: Mobil$Key) => Mobil.$key == _Sewa[i].id_mobil )[0],
					_Sewa[i].pengguna = this.$_pp2PenggunaDatabase.data.filter((Pengguna: Pengguna$Key) => Pengguna.$key == _Sewa[i].id_pengguna )[0]
					if (_Sewa[i].id_supir) {
						_Sewa[i].supir = this.$_pp2SupirDatabase.data.filter((Supir: Supir$Key) => Supir.$key == _Sewa[i].id_supir )[0]
					}
				}
				this.dataChange.next(_Sewa)
			}, 2000)
		})
		try { this.pengguna = JSON.parse(localStorage['ggPengguna']) }catch (e){}
		if (this.level == 'pengguna')
			this.$_pp2PenggunaDatabase.where = [['$key', '==', this.pengguna.id]];
	}
	ngAfterViewInit() {
		this.sewaMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.sewaMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnDestroy() {}
	ngOnInit() {
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.sewaMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	rowClick(row) {
		if (this.expandedSewa == row) {
			this.expandedSewa = null;
		} else {
			this.expandedSewa = row;
		}
		this.expandedSewa = this.expandedSewa == row ? null : row;
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.dialogRef = this.$_matDialog.open(_KonfirmasiHapusDialogComponent, { width: '300px', disableClose: true })
		this.dialogRef.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') this.$_pp2SewaDatabase.remove(id)
				this.dialogRef.close()
				this.dialogRef = null;
			})
	}
	periode(row: Sewa$Key): string {
		const mulai = new Date(row.tglMulai)
		const selesai = new Date(row.tglSelesai)
		const hasil = mulai.getDate() + '/' + mulai.getMonth() + '/' + mulai.getFullYear() + ' s/d <br>' + selesai.getDate() + '/' + selesai.getMonth() + '/' + selesai.getFullYear()
		return hasil + ' (' + row.totalSewaHari + ' Hari)';
	}
	hapusBR(str): string {
		return str.replace('<br>', '').replace('<br>', '').replace('<br>', '')
	}
	id(row: Sewa$Key): string {
		return `("m":"${row.id_mobil}"${row.id_supir ? ',"s":"' + row.id_supir + '"' : ''},"tm":"${row.tglMulai}","ts":"${row.tglSelesai}")`;
	}
}
