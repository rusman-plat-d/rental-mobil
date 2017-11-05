import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { $Socket } from './_user-view.socketio';

import { User } from '../../interfaces/user.interface';
import { ConfigService } from '../../services/config.service';
import { CONFIG } from '../../consts/config.const';

declare var io: any;

@Injectable()
export class UserDatabase {
	$Socket: Server;
	dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
	get data(): User[] { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket + '/db/User');
		$Socket(this);
	}
	add(user: User) {
		const copiedData = this.data.slice();
		copiedData.unshift(user);
		this.dataChange.next(copiedData);
	}
	update(user: User) {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (user.id === copiedData[$key].id) {
				Object.assign(copiedData[$key], user);
			}
		});
		this.dataChange.next(copiedData);
	}
	remove(id: string) {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((user: User) => {
			return id !== user.id;
		});
		this.dataChange.next(copiedData);
	}
}
