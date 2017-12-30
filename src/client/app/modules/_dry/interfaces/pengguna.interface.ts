export interface Pengguna {
	nama?: string;
	username?: string;
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

export interface Pengguna$Key extends Pengguna{
	$key?: string;
}
