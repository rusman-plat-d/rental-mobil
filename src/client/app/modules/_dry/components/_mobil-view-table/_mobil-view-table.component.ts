import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { MobilTableDataSource } from './_mobil-view-table.datasource';
import { DetailRow, MobilTableDetailDataSource } from './_mobil-view-table.detail.datasource';

import { Mobil } from '../../interfaces/mobil.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';

export type MobilTableProperties = 'id' | 'nama' | 'platNo' | 'kursi' | 'bensin' | 'hargaSewa' | 'image' | 'kondisi' | '_status' | '_disewaSampai' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-mobilViewTable',
	templateUrl: './_mobil-view-table.component.html',
	styleUrls: ['./_mobil-view-table.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _MobilViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;
	
	dataSource: MobilTableDataSource | null;
	dataSourceWithDetails: MobilTableDetailDataSource | null;
	// displayedColumns: MobilProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: MobilTableProperties[] = ['image', 'nama', 'hargaSewa', '_status', 'action'];
	changeReferences = false;
	wasExpanded = new Set<Mobil>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedMobil: Mobil;

	isDetailRow = (_index: number, row: DetailRow|Mobil) => row.hasOwnProperty('detailRow');
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public _database: DatabaseService,
		public $_pp2Conf: ConfigService
	){
		_database.init<Mobil>(this.$_pp2Conf.baseUrl + '/api/db/file/mobil/gets', 'mobil');
	}
	ngAfterViewInit(){}
	ngOnDestroy(){}
	ngOnInit() {
		this.dataSource = new MobilTableDataSource(this._database, this.C_Mat_Paginator, this.C_Mat_Sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new MobilTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedMobil == row) {
			this.expandedMobil = null;
		} else {
			this.expandedMobil = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string) {
		this.$_ngHttpClient.delete(this.$_pp2Conf.baseUrl + '/api/db/file/mobil/delete/'+id)
			.subscribe((res: {success: boolean}) => {
				console.log('res => ', res)
				if (res.success) {
					this._database.dataChange.next(
						this._database.dataChange.value.filter((mobil: Mobil) => mobil.id !== id)
					)
				}
			})
	}
}
