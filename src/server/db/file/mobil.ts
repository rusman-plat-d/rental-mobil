import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Mobil {
	id?: string;
	nama?: string;
	platNo?: string;
	kursi?: string;
	bensin?: string;
	hargaSewa?: string;
	image?: string;
	kondisi?: string;
	_status?: 'Tersedia' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: string;
	createdAt?: string;
	updatedAt?: string;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Mobil$: Mobil[];
try{
	Mobil$ = require('./mobil.json');
}catch(e){
	Mobil$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'mobil.json'), JSON.stringify(Mobil$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Mobil[] {
	console.log('[db]Mobil: gets');
	return Mobil$;
}
export function get(id: string): Mobil {
	console.log('[db]Mobil: get');
	return Mobil$.filter((Mobil: Mobil) => Mobil.id === id)[0];
}
export function add(mobil: Mobil): void {
	Mobil$.unshift(Object.assign(mobil, {
		_status: 'Tersedia',
		_disewa: 0,
		createdAt: Date.now(),
	}));
	save();
}
export function update(mobil: Mobil): void {
	console.log('[db]Mobil: update');
	Object.keys(Mobil$).map((key)=>{
		if( Mobil$[key].id == mobil.id ){
			Object.assign(Mobil$[key], Object.assign(mobil, {
				updatedAt: Date.now()
			}))
		}
	})
	save();
}
export function remove(id: string): void {
	console.log('[db]Mobil: remove');
	Mobil$ = Mobil$.filter((Mobil: Mobil) => {
		return id !== Mobil.id;
	});
	save();
}
