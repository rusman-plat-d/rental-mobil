export interface Mobil {
	id?: string;
	nama?: string;
	platNo?: string;
	kursi?: string;
	bensin?: string;
	hargaSewa?: number;
	image?: string;
	kondisi?: string;
	_status?: 'Tersedia' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: string;
	createdAt?: string;
	updatedAt?: string;
}
