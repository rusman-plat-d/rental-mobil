export interface Mobil {
	id?: string;
	nama?: string;
	platNo?: string;
	kursi?: number;
	bensin?: string;
	hargaSewa?: number;
	image?: string;
	kondisi?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}
