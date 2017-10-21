import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { ConfigService } from '../services/config.service';

@Injectable()
export class DatabaseService {
	dataChange: any;
	get data() { return this.dataChange.value; }
	get data_() {
		return this.data.filter((data) => {
			return data[this.prop] == this.val
		})
	};
	url = '';
	prop = '';
	table: string;
	val = '';
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_pp2Conf: ConfigService
	) {}
	private getData<T>(){
		this.$_ngHttpClient.get(this.url)
			.subscribe((res: T[]) => {
				this.dataChange.next(res)
				localStorage[this.table] = JSON.stringify(res);
			})
	}
	init<T>(url: string, table: string, prop = '', val = '') {
		this.url = url;
		this.table = table;
		this.prop = prop;
		this.val = val;
		this.dataChange = new BehaviorSubject<T[]>([]);
		this.getData<T>()
		setInterval(() => {
			this.getData<T>()
		}, 32000)
	}
	add<T>(data: T): T[] {
		const copiedData = this.data.slice();
		copiedData.unshift(data);
		localStorage[this.table] = JSON.stringify(copiedData);
		this.dataChange.next(copiedData);
		return this.data;
	}
	get<T>(id: string): T {
		return this.data.filter((data) => data.id === id)
	}
	update<T>(data: T): T[] {
		const copiedData = this.data.slice();
		for (let i in copiedData) {
			if (data['id'] === copiedData[i].id)
				Object.assign(copiedData[i], data);
		}
		this.dataChange.next(copiedData);
		localStorage[this.table] = JSON.stringify(copiedData);
		return this.data;
	}
	remove<T>(id: string) {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((data: T) => {
			return id !== data['id'];
		});
		this.dataChange.next(copiedData);
		localStorage[this.table] = JSON.stringify(copiedData);
		return this.data;
	}
	clear() {
		this.dataChange.next([]);
		localStorage[this.table] = '[]';
		return [];
	}
}
