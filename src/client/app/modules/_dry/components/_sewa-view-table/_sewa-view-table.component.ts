import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { TableExpand } from '../../animations/table-expand.animation';

import { SewaTableDataSource } from './_sewa-view-table.datasource';
import { DetailRow, SewaTableDetailDataSource } from './_sewa-view-table.detail.datasource';

import { Sewa, SewaId } from '../../interfaces/sewa.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';

// export type SewaProperties = 'id' | 'nama' | 'noKTP' | 'noHP' | 'jk' | 'email' | 'alamat' | 'image' | 'createdAt' | 'updatedAt' | 'action' | undefined;

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

	changeReferences = false;
	dataSource: SewaTableDataSource | null;
	dataSourceWithDetails: SewaTableDetailDataSource | null;
	// displayedColumns: SewaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: string[] = ['u_nama', 'm_nama', 's_nama', '_s_hari', '_s_hargaTotal', 'action'];
	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSewa: Sewa;
	isDetailRow = (_index: number, row: DetailRow | Sewa) => row.hasOwnProperty('detailRow');
	wasExpanded = new Set<Sewa>();
	_database: DatabaseService<SewaId>;
	level = this.$_ngActivatedRoute.data['value']['type'];
	pengguna;
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ngfDatabase: AngularFireDatabase,
		public $_pp2Conf: ConfigService
	) {
		this._database = new DatabaseService<SewaId>($_ngfDatabase);
		this._database.table = 'sewa';
		try {
			this.pengguna = JSON.parse(localStorage['ggPengguna'])
		} catch (e) { }
		if (this.level == 'pengguna')
			this._database.where = [['id_pengguna', '==', this.pengguna.id]];
	}
	ngAfterViewInit() {}
	ngOnDestroy() {}
	ngOnInit() {
		this.dataSource = new SewaTableDataSource(this._database, this.C_Mat_Paginator, this.C_Mat_Sort)
		setTimeout(()=>{
			console.log(this._database.data)
		}, 6000)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new SewaTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedSewa == row) {
			this.expandedSewa = null;
		} else {
			this.expandedSewa = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/sewa/delete/'+id)
			.subscribe((res) => {
				console.log(res)
			})
	}
	periode(row: Sewa): string {
		const mulai = new Date(row.tglMulai)
		const selesai = new Date(row.tglSelesai)
		const hasil = mulai.getDate() + '/' + mulai.getMonth() + '/' + mulai.getFullYear() + ' s/d <br>' + selesai.getDate() + '/' + selesai.getMonth() + '/' + selesai.getFullYear()
		return hasil + ' (' + row.totalSewaHari + ' Hari)';
	}
	hapusBR(str): string {
		return str.replace('<br>', '').replace('<br>', '').replace('<br>', '')
	}
	id(row: Sewa): string {
		return `("m":"${row.id_mobil}"${row.id_supir ? ',"s":"' + row.id_supir + '"' : ''},"tm":"${row.tglMulai}","ts":"${row.tglSelesai}")`;
	}
}
