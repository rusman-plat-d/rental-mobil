import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

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

	dataSource: SewaTableDataSource | null;
	dataSourceWithDetails: SewaTableDetailDataSource | null;
	// displayedColumns: SewaProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	// displayedColumns: string[] = ['u_image', 'u_nama', 'm_nama', 's_nama', '_s_hari', '_s_hargaTotal', 'action'];
	displayedColumns: string[] = ['u_image', 'u_nama', 'm_nama', '_s_hari', '_s_hargaTotal', 'action'];
	changeReferences = false;
	wasExpanded = new Set<Sewa>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedSewa: Sewa;

	isDetailRow = (row: DetailRow|Sewa) => row.hasOwnProperty('detailRow');
	_database: DatabaseService = new DatabaseService(this.$_pp2Conf);
	constructor(
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this._database.init<Sewa>('sewa','/db/sewa');
	}
	ngAfterViewInit(){}
	ngOnDestroy(){}
	ngOnInit() {
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
}
