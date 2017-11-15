import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Sewa {
	id?: string;
	id_user?: string;
	id_mobil?: string;
	id_supir?: string;
	tglMulai?: string;
	tglSelesai?: string;
	totalSewaHari?: string;
	totalSewaMobil?: string;
	totalSewaSupir?: string;
	totalSewa?: string;
	createdAt?: string;
	updatedAt?: string;
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
	return Sewa$;
}
export function get(id: string): Sewa {
	console.log('[db]Sewa: get');
	return Sewa$.filter((sewa: Sewa) => sewa.id === id)[0];
}
export function add(sewa: Sewa): void {
	console.log('[db]Sewa: add');
	Sewa$.unshift(Object.assign(sewa, {
		createdAt: Date.now(),
		updatedAt: Date.now()
	}));
	save();
}
export function update(sewa: Sewa): void {
	console.log('[db]Sewa: update');
	Object.keys(Sewa$).map((key)=>{
		if( Sewa$[key].id == sewa.id ){
			Object.assign(Sewa$[key], Object.assign(sewa, {
				updatedAt: Date.now()
			}))
		}
	})
	save();
}
export function remove(id: string): void {
	console.log('[db]Sewa: remove');
	Sewa$ = Sewa$.filter((Sewa: Sewa) => {
		return id !== Sewa.id;
	});
	save();
}