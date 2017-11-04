import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { $Socket } from './_supir-view.socketio';

import { Supir } from '../../interfaces/supir.interface';
import { ConfigService } from '../../services/config.service';
import { CONFIG } from '../../consts/config.const';

declare var io: any;

@Injectable()
export class SupirDatabase {
	$Socket: Server = io(this.$_pp2Conf.socket + '/db/supir');
	dataChange: BehaviorSubject<Supir[]> = new BehaviorSubject<Supir[]>([]);
	get data(): Supir[] { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket + '/db/supir');
		$Socket(this);
	}
	add(Supir: Supir) {
		const copiedData = this.data.slice();
		copiedData.unshift(Supir);
		this.dataChange.next(copiedData);
	}
	update(Supir: Supir) {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (Supir.id === copiedData[$key].id) {
				Object.assign(copiedData[$key], Supir);
			}
		});
		this.dataChange.next(copiedData);
	}
	remove(id: string) {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((Supir: Supir) => {
			return id !== Supir.id;
		});
		this.dataChange.next(copiedData);
	}
}
