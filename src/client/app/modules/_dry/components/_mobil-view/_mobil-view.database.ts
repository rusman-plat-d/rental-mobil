import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { $Socket } from './_mobil-view.socketio';

import { Mobil } from '../../interfaces/Mobil.interface';
import { ConfigService } from '../../services/config.service';
import { CONFIG } from '../../consts/config.const';

declare var io: any;

@Injectable()
export class MobilDatabase {
	$Socket: Server;
	dataChange: BehaviorSubject<Mobil[]> = new BehaviorSubject<Mobil[]>([]);
	get data(): Mobil[] { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket + '/db/mobil');
		$Socket(this);
	}
	add(Mobil: Mobil) {
		const copiedData = this.data.slice();
		copiedData.unshift(Mobil);
		this.dataChange.next(copiedData);
	}
	update(Mobil: Mobil) {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (Mobil.id === copiedData[$key].id) {
				Object.assign(copiedData[$key], Mobil);
			}
		});
		this.dataChange.next(copiedData);
	}
	remove(id: string) {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((Mobil: Mobil) => {
			return id !== Mobil.id;
		});
		this.dataChange.next(copiedData);
	}
}
