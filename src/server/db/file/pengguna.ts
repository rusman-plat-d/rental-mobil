import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Pengguna {
	id?: string;
	nama?: string;
	Penggunaname?: string;
	password?: string;
	noKTP?: string;
	noHP?: string;
	jk?: string;
	email?: string;
	alamat?: string;
	image?: string;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Pengguna$: Pengguna[];
try{
	Pengguna$ = require('./pengguna.json');
}catch(e){
	Pengguna$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'pengguna.json'), JSON.stringify(Pengguna$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Pengguna[] {
	console.log('[db]Pengguna: gets');
	return Pengguna$;
}
export function get(id: string): Pengguna {
	console.log('[db]Pengguna: get');
	return Pengguna$.filter((Pengguna: Pengguna) => Pengguna.id === id)[0];
}
export function add(Pengguna: Pengguna): void {
	console.log('[db]Pengguna: add');
	Pengguna$.unshift(Object.assign(Pengguna, {
		id: ((Math.random() * Math.random() * 1000).toString() + Date.now()).replace('.', '').replace('.', ''),
		createdAt: Date.now(),
		updatedAt: Date.now()
	}));
	save();
}
export function update(pengguna: Pengguna): void {
	console.log('[db]Pengguna: update');
	for(let i in Pengguna$){
		if( Pengguna$[i].id == pengguna.id ){
			Object.assign(Pengguna$[i], pengguna, { updatedAt: Date.now() })
		}
	}
	save();
}
export function remove(id: string): void {
	console.log('[db]Pengguna: remove');
	Pengguna$ = Pengguna$.filter((pengguna: Pengguna) => {
		return id !== pengguna.id;
	});
	save();
}
