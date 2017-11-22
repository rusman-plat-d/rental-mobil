import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { SewaTableDataSource } from './_sewa-view-table.datasource';
import { DetailRow, SewaTableDetailDataSource } from './_sewa-view-table.detail.datasource';

import { Sewa } from '../../interfaces/sewa.interface';

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
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;

	changeReferences = false;
	dataSource: SewaTableDataSource | null;
	dataSourceWithDetails: SewaTableDetailDataSource | null;
	// displayedColumns: SewaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	// displayedColumns: string[] = ['u_image', 'u_nama', 'm_nama', '_s_hari', '_s_hargaTotal', 'action'];
	displayedColumns: string[] = ['u_image', 'u_nama', 'm_nama', 's_nama', '_s_hari', '_s_hargaTotal', 'action'];
	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSewa: Sewa;
	isDetailRow = (row: DetailRow|Sewa) => row.hasOwnProperty('detailRow');
	wasExpanded = new Set<Sewa>();
	_database: DatabaseService = new DatabaseService(this.$_pp2Conf);
	level = this.$_ngActivatedRoute.data['value']['type'];
	user;
	constructor(
		public $_ngRouter: Router,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_pp2Conf: ConfigService
	) {
		setTimeout(()=>{
			console.log(this._database.data)
		},4000)
		try{
			this.user = JSON.parse(localStorage['ggPengguna'])
		}catch(e){}
		if (this.level == 'pengguna') {
			this._database.init<Sewa>('sewa', '/db/sewa', 'id_user', this.user.id)
		}else{
			this._database.init<Sewa>('sewa', '/db/sewa')
		}
	}
	ngAfterViewInit(){}
	ngOnDestroy(){}
	ngOnInit() {
		console.log(this.level)
		this.dataSource = new SewaTableDataSource(this._database, this.C_Mat_Paginator, this.C_Mat_Sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new SewaTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		// alert(JSON.stringify(this.$_ngActivatedRoute.data['value']['type']))
		if (this.expandedSewa == row) {
			this.expandedSewa = null;
		} else {
			this.expandedSewa = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id) {
		alert('delete');
		this._database.$Socket.emit('remove', id)
	}
	periode(row: Sewa): string{
		const mulai = new Date(row.tglMulai)
		const selesai = new Date(row.tglSelesai)
		const hasil = mulai.getDate() + '/' + mulai.getMonth() + '/' + mulai.getFullYear() + ' s/d <br>' + selesai.getDate() + '/' + selesai.getMonth() + '/' + selesai.getFullYear()
		return hasil + ' (' + row.totalSewaHari + ' Hari)';
	}
	hapusBR(str): string{
		return str.replace('<br>', '').replace('<br>', '').replace('<br>', '')
	}
	id(row: Sewa): string {
		return `("m":"${row.id_mobil}"${row.id_supir?',"s":"'+row.id_supir+'"':''},"tm":"${row.tglMulai}","ts":"${row.tglSelesai}")`;
	}
}
