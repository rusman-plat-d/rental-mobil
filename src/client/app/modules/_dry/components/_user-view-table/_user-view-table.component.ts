import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { UserTableDataSource } from './_user-view-table.datasource';
import { DetailRow, UserTableDetailDataSource } from './_user-view-table.detail.datasource';

import { User } from '../../interfaces/user.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';

export type UserProperties = 'id' | 'nama' | 'noKTP' | 'noHP' | 'jk' | 'email' | 'alamat' | 'image' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-userViewTable',
	templateUrl: './_user-view-table.component.html',
	styleUrls: ['./_user-view-table.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _UserViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('filter') filter: ElementRef;
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;

	changeReferences = false;
	dataSource: UserTableDataSource | null;
	dataSourceWithDetails: UserTableDetailDataSource | null;
	// displayedColumns: UserProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: UserProperties[] = ['image', 'nama', 'noHP', 'email', 'action'];

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedUser: User;
	wasExpanded = new Set<User>();

	isDetailRow = (row: DetailRow|User) => row.hasOwnProperty('detailRow');
	constructor(
		public $_ngRouter: Router,
		public _database: DatabaseService,
		public $_pp2Conf: ConfigService
	) {
		_database.init<User>('user','/db/user');
	}
	ngAfterViewInit(){}
	ngOnDestroy(){}
	ngOnInit() {
		this.dataSource = new UserTableDataSource(this._database, this.C_Mat_Paginator, this.C_Mat_Sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new UserTableDetailDataSource(this.dataSource);
	}
	rowClick(row) {
		if (this.expandedUser == row) {
			this.expandedUser = null;
		} else {
			this.expandedUser = row;
		}
		this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id) {
		alert('delete');
		this._database.$Socket.emit('remove', id)
	}
}
