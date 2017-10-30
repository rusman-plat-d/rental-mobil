import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export let LATEST_ID: number = 0;

export interface Supir{
	id?: string;
	nama?: string;
	noSim?: string;
	jk?: string;
	noHP?: string;
	alamat?: string;
	email?: string;
	image?: string;
};

@Injectable()
export class SupirDatabase {
	dataChange: BehaviorSubject<Supir[]> = new BehaviorSubject<Supir[]>([]);
	get data(): Supir[] { return this.dataChange.value; }
	constructor() {}

	addPerson($Supir) {
		const copiedData = this.data.slice();
		copiedData.push($Supir);
		this.dataChange.next(copiedData);
	}
}
