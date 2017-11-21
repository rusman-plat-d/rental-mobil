import { Mobil } from './mobil.interface';
import { Supir } from './supir.interface';
import { User } from './user.interface';

export interface Sewa {
	id?: string;
	id_user?: string;
	id_mobil?: string;
	id_supir?: string;
	mobil?: Mobil;
	supir?: Supir;
	user?: User;
	tglMulai?: string;
	tglSelesai?: string;
	totalSewaHari?: number;
	totalSewaMobil?: number;
	totalSewaSupir?: number;
	totalSewaHarga?: number;
	createdAt?: string;
	updatedAt?: string;
}
