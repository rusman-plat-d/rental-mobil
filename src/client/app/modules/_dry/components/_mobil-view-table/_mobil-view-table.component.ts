import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { Mobil } from '../../interfaces/mobil.interface';
import { MobilTableDatabase } from './_mobil-view-table.database';
import { MobilTableDataSource } from './_mobil-view-table.datasource';
import { DetailRow, MobilTableDetailDataSource } from './_mobil-view-table.detail.datasource';

import { ConfigService } from '../../services/config.service';
import { TableExpand } from '../../animations/table-expand.animation';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

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
	@ViewChild(_NavComponent) C_Pp2_Dry_Nav: _NavComponent;
	
	dataSource: MobilTableDataSource | null;
	dataSourceWithDetails: MobilTableDetailDataSource | null;
	// displayedColumns: MobilProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: MobilTableProperties[] = ['image', 'nama', 'hargaSewa', '_status', 'action'];
	changeReferences = false;
	wasExpanded = new Set<Mobil>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedMobil: Mobil;

	isDetailRow = (row: DetailRow|Mobil) => row.hasOwnProperty('detailRow');
	constructor(
		public $_ngRouter: Router,
		public MobilDatabase: MobilTableDatabase,
		public $_pp2Conf: ConfigService
	) {}
	ngAfterViewInit(){
		this.C_Pp2_Dry_Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnDestroy(){}
	ngOnInit() {
		this.dataSource = new MobilTableDataSource(this.MobilDatabase, this.C_Mat_Paginator, this.C_Mat_Sort)
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
	remove(id) {
		alert('delete');
		this.MobilDatabase.$Socket.emit('remove', id)
	}
}
