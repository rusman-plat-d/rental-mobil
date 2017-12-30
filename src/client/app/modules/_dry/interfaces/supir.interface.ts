export interface Supir {
	nama?: string;
	noSIM?: string;
	noHP?: string;
	jk?: string;
	hargaSewa?: number;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}

export interface Supir$Key extends Supir{
	$key?: string;
}
