import { Mobil } from './mobil.interface';
import { Supir } from './supir.interface';
import { Pengguna } from './pengguna.interface';

export interface Sewa {
	denda?: number;
	id_mobil?: string;
	id_pengguna?: string;
	id_supir?: string;
	kondisi?: string;
	mobil?: Mobil;
	supir?: Supir;
	pengguna?: Pengguna;
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

export interface SewaId extends Sewa{
	id?: string;
}
