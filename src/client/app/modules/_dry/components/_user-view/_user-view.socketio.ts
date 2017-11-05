import { UserDatabase } from './_user-view.database';
import { User } from '../../interfaces/User.interface';
import { SocketIOStatic, Server } from '../../interfaces/socket.interface';


declare var io: SocketIOStatic;
export function $Socket($this: UserDatabase) {
	$this.$Socket.on('connect', () => {
		$this.$Socket.emit('gets', (User$: User[]) => {
			User$.map((_User, i) => {
				$this.add(_User);
			})
		})
	});
	$this.$Socket.on('add', (user: User) => {
		$this.add(user);
	});
	$this.$Socket.on('update', (user: User) => {
		$this.update(user);
	});
	$this.$Socket.on('remove', (id: string) => {
		$this.remove(id);
	});
}
