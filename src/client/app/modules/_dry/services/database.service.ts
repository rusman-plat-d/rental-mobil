import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { SocketIOStatic, Server } from '../interfaces/socket.interface';

import { ConfigService } from '../services/config.service';

import { $Socket } from '../helpers/database.socketio.helper';

declare var io: any;

@Injectable()
export class DatabaseService{
	$Socket: Server;
	dataChange: any;
	get data() { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	){}
	init <T>(namespace: string){
		this.dataChange = new BehaviorSubject<T[]>([]);
		this.$Socket = io(this.$_pp2Conf.socket + namespace);
		$Socket<T>(this);
	}
	add <T>(data: T): T[] {
		const copiedData = this.data.slice();
		copiedData.unshift(data);
		this.dataChange.next(copiedData);
		return this.data;
	}
	update <T>(data: T): T[] {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (data['id'] === copiedData[$key].id) {
				Object.assign(copiedData[$key], data);
			}
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	remove <T>(id: string) {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((data: T) => {
			return id !== data['id'];
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	clear() {
		this.dataChange.next([]);
		return this.data;
	}
}
