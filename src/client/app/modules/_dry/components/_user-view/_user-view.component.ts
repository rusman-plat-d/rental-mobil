import { Component, ElementRef, Inject, InjectionToken, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';
import { UserDatabase } from './_user-view.database';
import { UserDataSource } from './_user-view.datasource';
import { DetailRow, UserDetailDataSource } from './_user-view.detail.datasource';

import { ConfigService } from '../../services/config.service';
import { TableExpand } from '../../animations/table-expand.animation';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

export type UserProperties = 'id' | 'nama' | 'noKTP' | 'noHP' | 'jk' | 'email' | 'alamat' | 'image' | 'createdAt' | 'updatedAt' | 'action' | undefined;
export type TrackByStrategy = 'id' | 'reference' | 'index';

@Component({
	selector: 'pp2-dry-userView',
	templateUrl: './_user-view.component.html',
	styleUrls: ['./_user-view.component.scss'],
	animations: [
		...TableExpand
	]
})
export class _UserViewComponent implements OnDestroy, OnInit {
	dataSource: UserDataSource | null;
	dataSourceWithDetails: UserDetailDataSource | null;
	// displayedColumns: UserProperties[] = ['id', 'nama', 'noKTP', 'noHP', 'jk', 'email', 'alamat', 'image', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: UserProperties[] = ['image', 'nama', 'jk', 'noHP', 'email', 'action'];
	trackByStrategy: TrackByStrategy = 'reference';
	changeReferences = false;
	wasExpanded = new Set<User>();

	dynamicColumnDefs: any[] = [];
	dynamicColumnIds: string[] = [];
	expandedUser: User;

	isDetailRow = (row: DetailRow|User) => row.hasOwnProperty('detailRow');
	@ViewChild(MatPaginator) C_mat_paginator: MatPaginator;
	@ViewChild(MatSort) C_mat_sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	constructor(
		public $_ngRouter: Router,
		public UserDatabase: UserDatabase,
		public $_pp2Conf: ConfigService
	) {}
	ngOnDestroy(){
		this.UserDatabase.$Socket = null;
	}
	ngOnInit() {
		this.dataSource = new UserDataSource(this.UserDatabase, this.C_mat_paginator, this.C_mat_sort)
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
		this.dataSourceWithDetails = new UserDetailDataSource(this.dataSource);
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
		this.UserDatabase.$Socket.emit('remove', id)
	}
}
