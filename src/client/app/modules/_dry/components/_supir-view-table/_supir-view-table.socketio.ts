import { SupirTableDatabase } from './_supir-view-table.database';
import { Supir } from '../../interfaces/supir.interface';
import { SocketIOStatic, Server } from '../../interfaces/socket.interface';


declare var io: SocketIOStatic;
export function $Socket($this: SupirTableDatabase) {
	$this.$Socket.on('connect', () => {
		$this.$Socket.emit('gets', (Supir$: Supir[]) => {
			Supir$.map((_Supir, i) => {
				$this.add(_Supir);
			})
		})
	});
	$this.$Socket.on('disconnect', () => {
		$this.clear();
	})
	$this.$Socket.on('add', (Supir: Supir) => {
		$this.add(Supir);
	});
	$this.$Socket.on('update', (Supir: Supir) => {
		$this.update(Supir);
	});
	$this.$Socket.on('remove', (_id: string) => {
		$this.remove(_id);
	});
}
