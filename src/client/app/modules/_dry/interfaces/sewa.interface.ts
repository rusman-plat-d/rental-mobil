import { Mobil } from './mobil.interface';
import { Supir } from './supir.interface';
import { Pengguna } from './pengguna.interface';

export interface Sewa {
	denda?: number;
	id?: string;
	id_user?: string;
	id_mobil?: string;
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
