import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as Mobil from './mobil';
import * as Supir from './supir';
import * as Pengguna from './pengguna';

declare var require: any;
declare var __dirname: any;

export interface Sewa {
	denda?: number;
	id?: string;
	id_pengguna?: string;
	id_mobil?: string;
	id_supir?: string;
	kondisi?: string;
	mobil?: Mobil.Mobil;
	supir?: Supir.Supir;
	pengguna?: Pengguna.Pengguna;
	tglMulai?: number;
	tglSelesai?: number;
	tglSewaMulai?: number;
	tglSewaSelesai?: number;
	totalSewaHari?: number;
	totalSewaMobil?: number;
	totalSewaSupir?: number;
	totalSewa?: number;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Sewa$: Sewa[];
try{
	Sewa$ = require('./sewa.json');
}catch(e){
	Sewa$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'sewa.json'), JSON.stringify(Sewa$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Sewa[] {
	console.log('[db]Sewa: gets');
	let Sewa$_ = Sewa$;
	for (let key in Sewa$_) {
		Sewa$_[key].mobil = Mobil.get(Sewa$_[key].id_mobil)
		Sewa$_[key].pengguna = Pengguna.get(Sewa$_[key].id_pengguna)
		if (Sewa$_[key].id_supir) {
			Sewa$_[key].supir = Supir.get(Sewa$_[key].id_supir)
		}
	}
	return Sewa$_.filter((sewa: Sewa) => {
		return sewa.mobil;
	});
}
export function get(id: string): Sewa {
	console.log('[db]Sewa: get');
	return Sewa$.filter((sewa: Sewa) => sewa.id === id)[0];
}
export function add(sewa: Sewa): void {
	console.log('[db]Sewa: add');
	Sewa$.unshift(Object.assign(sewa, {
		id: v4(),
		createdAt: Date.now(),
		updatedAt: Date.now()
	}));
	save();
}
export function update(sewa: Sewa): void {
	console.log('[db]Sewa: update');
	for(let i in Sewa$){
		if( Sewa$[i].id == sewa.id ){
			Object.assign(Sewa$[i], sewa, { updatedAt: Date.now() })
		}
	}
	save();
}
export function remove(id: string): void {
	console.log('[db]Sewa: remove');
	const sewa = get(id);
	Mobil.update(Object.assign(Mobil.get(sewa.id_mobil), { _status: 'Tersedia' }))
	if (sewa.id_supir) {
		Supir.update(Object.assign(Supir.get(sewa.id_supir), { _status: 'Tersedia' }))
	}
	Sewa$ = Sewa$.filter((sewa: Sewa) => {
		return id !== sewa.id;
	});
	save();
}
