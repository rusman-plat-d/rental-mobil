import { Mobil$Key } from './mobil.interface';
import { Supir$Key } from './supir.interface';
import { Pengguna$Key } from './pengguna.interface';

export interface Sewa {
	denda?: number;
	id_mobil?: string;
	id_pengguna?: string;
	id_supir?: string;
	kondisi?: string;
	mobil?: Mobil$Key;
	pengguna?: Pengguna$Key;
	supir?: Supir$Key;
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

export interface Sewa$Key extends Sewa{
	$key?: string;
}
export { Mobil$Key, Pengguna$Key, Supir$Key }
