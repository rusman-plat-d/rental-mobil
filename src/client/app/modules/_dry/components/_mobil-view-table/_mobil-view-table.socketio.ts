import { MobilTableDatabase } from './_mobil-view-table.database';
import { Mobil } from '../../interfaces/mobil.interface';
import { SocketIOStatic, Server } from '../../interfaces/socket.interface';


declare var io: SocketIOStatic;
export function $Socket($this: MobilTableDatabase) {
	$this.$Socket.on('connect', () => {
		$this.$Socket.emit('gets', (Mobil$: Mobil[]) => {
			Mobil$.map((_Mobil, i) => {
				$this.add(_Mobil);
			})
		})
	});
	$this.$Socket.on('disconnect', () => {
		$this.clear();
	});
	$this.$Socket.on('add', (Mobil: Mobil) => {
		$this.add(Mobil);
	});
	$this.$Socket.on('update', (Mobil: Mobil) => {
		$this.update(Mobil);
	});
	$this.$Socket.on('remove', (_id: string) => {
		$this.remove(_id);
	});
}
