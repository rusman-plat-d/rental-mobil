import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, isDevMode } from '@angular/core';
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
	set table(val){
		this._table = val
		this.itemsRef = this.$_ngfDatabase.list('/' + val);
		this.items = this.itemsRef.valueChanges()
	}
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
		console.log(this.itemsRef, data)
		return this.itemsRef.push(data)
	}
	gets(): Observable<T[]>{
		return this.itemsRef.snapshotChanges().map((arr) => {
			console.log(arr);
			return arr.map((snap) => {
				return Object.assign(snap.payload.val(), { $key: snap.key })
			})
		})
	}
	get(key: string): Observable<T | null> {
		const itemPath = `/${this.table}/${key}`;
		return this.$_ngfDatabase.object(itemPath).valueChanges() as Observable<T | null>
	}
	update(key: string, data: T): Promise<void> {
		return this.itemsRef.update(key, data)
	}
	remove(key: string): Promise<void> {
		return this.itemsRef.remove(key)
	}
	clearAll(): Promise<void> {
		return this.itemsRef.remove()
	}
}
