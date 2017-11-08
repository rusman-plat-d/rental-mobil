export interface Supir {
	id?: string;
	nama?: string;
	noSIM?: string;
	jk?: string;
	noHP?: string;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: string;
	createdAt?: string;
	updatedAt?: string;
}
