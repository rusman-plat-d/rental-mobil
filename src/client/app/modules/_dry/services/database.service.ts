import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { SocketIOStatic, Server } from '../interfaces/socket.interface';

import { ConfigService } from '../services/config.service';

import { $Socket } from '../helpers/database.socketio.helper';

// import * as io from '../libs/socket.io-client/socket.io';
import * as io from 'socket.io-client/dist/socket.io';

@Injectable()
export class DatabaseService{
	$Socket: Server;
	dataChange: any;
	get data() { return this.dataChange.value; }
	get data_() {
		return this.data.filter((data)=>{
			return data[this.prop] == this.val
		})
	};
	prop = '';
	table: string;
	val = '';
	constructor(
		public $_pp2Conf: ConfigService
	){}
	init <T>(table: string, namespace: string = '',prop='', val=''){
		this.table = table;
		this.prop = prop;
		this.val = val;
		this.dataChange = new BehaviorSubject<T[]>([]);
		this.$Socket = io(this.$_pp2Conf.socket + namespace);
		this.$Socket.emit('gets', (data$: T[]) => {
			setTimeout(() => {
				this.dataChange.next(data$)
				localStorage[table] = JSON.stringify(data$);
			},10)
		})
		$Socket<T>(this);
	}
	add <T>(data: T): T[] {
		const copiedData = this.data.slice();
		copiedData.unshift(data);
		localStorage[this.table] = JSON.stringify(copiedData);
		this.dataChange.next(copiedData);
		return this.data;
	}
	get <T>(id: string): T{
		return
	}
	update <T>(data: T): T[] {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (data['id'] === copiedData[$key].id) {
				Object.assign(copiedData[$key], data);
			}
		});
		this.dataChange.next(copiedData);
		localStorage[this.table] = JSON.stringify(copiedData);
		return this.data;
	}
	remove <T>(id: string) {
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
