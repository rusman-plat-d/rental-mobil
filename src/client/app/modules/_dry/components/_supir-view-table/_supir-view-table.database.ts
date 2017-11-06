import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { $Socket } from './_supir-view-table.socketio';

import { Supir } from '../../interfaces/supir.interface';
import { ConfigService } from '../../services/config.service';
import { CONFIG } from '../../consts/config.const';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var io: any;

@Injectable()
export class SupirTableDatabase {
	$Socket: Server = io(this.$_pp2Conf.socket + '/db/supir');
	dataChange: BehaviorSubject<Supir[]> = new BehaviorSubject<Supir[]>([]);
	get data(): Supir[] { return this.dataChange.value; }
	constructor(
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket + '/db/supir');
		$Socket(this);
	}
	add(Supir: Supir): Supir[] {
		const copiedData = this.data.slice();
		copiedData.unshift(Supir);
		this.dataChange.next(copiedData);
		return this.data;
	}
	update(Supir: Supir): Supir[] {
		const copiedData = this.data.slice();
		Object.keys(copiedData).map(($key) => {
			if (Supir.id === copiedData[$key].id) {
				Object.assign(copiedData[$key], Supir);
			}
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	remove(id: string): Supir[] {
		let copiedData = this.data.slice();
		copiedData = copiedData.filter((Supir: Supir) => {
			return id !== Supir.id;
		});
		this.dataChange.next(copiedData);
		return this.data;
	}
	clear(): Supir[] {
		this.dataChange.next([]);
		return this.data;
	}
}
