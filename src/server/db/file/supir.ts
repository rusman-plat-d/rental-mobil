import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Supir {
	id?: string;
	nama?: string;
	noSIM?: string;
	noHP?: string;
	jk?: string;
	hargaSewa?: string;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: string;
	createdAt?: string;
	updatedAt?: string;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Supir$: Supir[];
try{
	Supir$ = require('./supir.json');
}catch(e){
	Supir$ = [];
}

function save(): void {
	console.log(Supir$)
	writeFile(join(__dirname, 'supir.json'), JSON.stringify(Supir$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Supir[] {
	console.log('[db]Supir: gets');
	return Supir$;
}
export function get(id: string): Supir {
	console.log('[db]Supir: get');
	return Supir$.filter((supir: Supir) => supir.id === id)[0];
}
export function add(Supir: Supir) {
	Supir$.unshift(Object.assign(Supir, {
		_status: 'Tersedia',
		_disewa: 0,
		createdAt: Date.now(),
		updatedAt: Date.now()
	}));
	save();
}
export function update(Supir: Supir): void {
	console.log('[db]Supir: update');
	Object.keys(Supir$).map((key)=>{
		if( Supir$[key].id == Supir.id ){
			Object.assign(Supir$[key], Object.assign(Supir, {
				updatedAt: Date.now()
			}))
		}
	})
	save();
}
export function remove(id: string): void {
	console.log('[db]Supir: remove');
	Supir$ = Supir$.filter((Supir: Supir) => {
		return id !== Supir.id;
	});
	save();
}
