export interface Supir {
	id?: string;
	nama?: string;
	noSIM?: string;
	noHP?: string;
	jk?: string;
	hargaSewa?: number;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Disewa';
	_disewa?: string;
	_disewaSampai?: string;
	createdAt?: string;
	updatedAt?: string;
}
