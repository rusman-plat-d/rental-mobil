import { DatabaseService } from '../services/database.service';

export function $Socket <T>($this: DatabaseService) {
	$this.$Socket.on('connect', () => {
		$this.$Socket.emit('gets', (data$: T[]) => {
			data$.map((data, i) => {
				$this.add(data);
			})
		})
	});
	$this.$Socket.on('disconnect', () => {
		$this.clear();
	});
	$this.$Socket.on('add', (data: T) => {
		$this.add(data);
	});
	$this.$Socket.on('update', (data: T) => {
		$this.update(data);
	});
	$this.$Socket.on('remove', (id: string) => {
		$this.remove(id);
	});
}
