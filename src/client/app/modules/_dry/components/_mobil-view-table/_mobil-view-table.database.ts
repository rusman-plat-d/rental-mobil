import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { $Socket } from './_mobil-view-table.socketio';

import { Mobil } from '../../interfaces/Mobil.interface';
import { ConfigService } from '../../services/config.service';
import { CONFIG } from '../../consts/config.const';

declare var io: any;

@Injectable()
export class MobilTableDatabase {
	$Socket: Server;
	dataChange: BehaviorSubject<Mobil[]> = new BehaviorSubject<Mobil[]>([]);
	get data(): Mobil[] { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket + '/db/mobil');
		$Socket(this);
	}
	add(mobil: Mobil): Mobil[] {
		const copiedData = this.data.slice();
		copiedData.unshift(mobil);
		this.dataChange.next(copiedData);
		return this.data;
	}
	update(mobil: Mobil): Mobil[] {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (mobil.id === copiedData[$key].id) {
				Object.assign(copiedData[$key], mobil);
			}
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	remove(id: string): Mobil[] {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((Mobil: Mobil) => {
			return id !== Mobil.id;
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	clear(): Mobil[] {
		this.dataChange.next([]);
		return this.data;
	}
}
