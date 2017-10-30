import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

const { writeFile } = require('fs');
const { join } = require('path');

let $data: Supir[];
try{
	$data = require('./supir.json');
}catch(e){
	$data = [];
}

function save() {
	writeFile(join(__dirname, 'supir.json'), JSON.stringify($data), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}
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

export function gets(): Supir[] {
	console.log('[db]Supir: gets');
	return $data;
}
export function get(id: string): Supir {
	console.log('[db]Supir: get');
	return $data.filter((supir: Supir) => supir.id === id)[0];
}
export function add(supir: Supir) {
	$data.unshift(supir);
	save();
}
export function update(supir: Supir): void {
	console.log('[db]Supir: update');
	Object.keys($data).map((key: string) => {
		if ( $data[key].id === supir.id ) {
			Object.assign($data[key], supir);
		}
	})
	save();
}
export function remove(id: string) {
	console.log('[db]Supir: remove');
	$data = $data.filter((supir: Supir) => supir.id !== id)
	save();
}
