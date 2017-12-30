import { EventEmitter, Inject, Injectable, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export type Operator = '<' | '>' | '<=' | '>=' | '==' | '===' | '!=' | '!==';

@Injectable()
export class DatabaseService<T> {
	get data(): T[] {
		let _data = this.dataChange.value;
		if (this.where) {
			for(let i in this.where){
				_data = _data.filter((data: T) => {
					let retVal;
					switch (this.where[i][1]) {
						case '<':	retVal = data[this.where[i][0]] <	this.where[i][2]; break;
						case '>':	retVal = data[this.where[i][0]] >	this.where[i][2]; break;
						case '<=':	retVal = data[this.where[i][0]] <=	this.where[i][2]; break;
						case '>=':	retVal = data[this.where[i][0]] >=	this.where[i][2]; break;
						case '==':	retVal = data[this.where[i][0]] ==	this.where[i][2]; break;
						case '===':	retVal = data[this.where[i][0]] ===	this.where[i][2]; break;
						case '!=':	retVal = data[this.where[i][0]] !=	this.where[i][2]; break;
						case '!==':	retVal = data[this.where[i][0]] !==	this.where[i][2]; break;
					}
					return retVal;
				})
			}
		}
		return _data;
	}
	private _table: string;
	get table() {
		return this._table;
	}
	set table(tableName){
		this._table = tableName
		this.itemsRef = this.$_ngfDatabase.list('/' + tableName);
		this.itemsRef.snapshotChanges()
			.map((actions) => {
				return actions.map(action => Object.assign(action.payload.val(), {$key: action.key}) )
			}).subscribe(data => {
				this.dataChange.next(data)
				this.$data$.next(data)
				if (window) {
					localStorage[tableName] = JSON.stringify(data)
				}
				return data.map(item => item.$key);
			})
	}
	$data$: EventEmitter<T[]> = new EventEmitter<T[]>();
	where: any[][2];
	dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	itemsRef: AngularFireList<T>;
	items: Observable<T[]>;
	itemRef:  AngularFireObject<T>;
	item: Observable<T>
	constructor(
		private $_ngfDatabase: AngularFireDatabase
	) {}
	create(data: T): firebase.database.ThenableReference {
		return this.itemsRef.push(data)
	}
	gets(): T[]{
		return this.data;
	}
	update(key: string, data: T): Promise<void> {
		return this.itemsRef.update(key, data)
	}
	remove($key: string): Promise<void> {
		return this.itemsRef.remove($key)
	}
	// clearAll(): Promise<void> {
	// 	return this.itemsRef.remove()
	// }
}
