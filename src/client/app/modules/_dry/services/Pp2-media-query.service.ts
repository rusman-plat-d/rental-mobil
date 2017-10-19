import { EventEmitter, Injectable } from '@angular/core';

import { Pp2MediaQueryScreen } from '../interfaces/Pp2-media-query.interface';

declare var window: Window;

@Injectable()
export class Pp2MediaQueryService {
	readonly screen: EventEmitter<Pp2MediaQueryScreen> = new EventEmitter<Pp2MediaQueryScreen>();
	constructor() {
		setTimeout(() => {
			this.onWindowResize();
		}, 1)
		window.onresize = (e: any) => {
			this.onWindowResize();
		}
	}
	onWindowResize(): void {
		this.screen.next({
			isLTOE600px: window.innerWidth <= 600 ? true : false,
			isGT600px: window.innerWidth > 600 ? true : false,
			isGT900px: window.innerWidth > 900 ? true : false,
			isGT1200px: window.innerWidth > 1200 ? true : false,
			innerHeight: window.innerHeight,
			innerWidth: window.innerWidth,
			outerHeight: window.outerHeight,
			outerWidth: window.outerWidth
		});
	}
}
