import { Injectable } from '@angular/core';

declare var window: Window;
declare var document: Document;

@Injectable()
export class Pp2MediaQueryService {
	readonly screen: {
		isLTOE600px: boolean,
		isGT600px: boolean,
		isGT900px: boolean,
		isGT1200px: boolean,
		innerHeight: number,
		innerWidth: number,
		outerHeight: number,
		outerWidth: number
	} = {
		isLTOE600px: false,
		isGT600px: false,
		isGT900px: false,
		isGT1200px: false,
		innerHeight: 0,
		innerWidth: 0,
		outerHeight: 0,
		outerWidth: 0
	};
	constructor() {
		this.onWindowResize();
		window.onresize = (e: any) => {
			this.onWindowResize();
		}
	}
	onWindowResize(): void {
		this.screen.isLTOE600px = window.innerWidth <= 600 ? true : false;
		this.screen.isGT600px = window.innerWidth > 600 ? true : false;
		this.screen.isGT900px = window.innerWidth > 900 ? true : false;
		this.screen.isGT1200px = window.innerWidth > 1200 ? true : false;
		this.screen.innerHeight = window.innerHeight;
		this.screen.innerWidth = window.innerWidth;
		this.screen.outerHeight = window.outerHeight;
		this.screen.outerWidth = window.outerWidth;
	}
}
