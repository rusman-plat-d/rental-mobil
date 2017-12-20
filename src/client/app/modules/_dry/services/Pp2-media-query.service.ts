import { EventEmitter, Injectable } from '@angular/core';

import { Pp2MediaQueryScreenConst } from '../consts/Pp2MediaQueryScreen.const';
import { Pp2MediaQueryScreen } from '../interfaces/Pp2-media-query.interface';

declare var module: any, require: any;

@Injectable()
export class Pp2MediaQueryService {
	size = {
		xs:	{min:0,		max:575},
		s:	{min:575,	max:750},
		m:	{min:750,	max:925},
		l:	{min:925,	max:1200},
		xl: {min:1200,	max:100000}
	};
	// MQ: any = {
	// 	xs:	window.matchMedia(`(min-width: ${this.size.xs.min}px)	and (max-width: ${this.size.xs.max}px)`),
	// 	s:	window.matchMedia(`(min-width: ${this.size.s.min}px)	and (max-width: ${this.size.s.max}px)`),
	// 	m:	window.matchMedia(`(min-width: ${this.size.m.min}px)	and (max-width: ${this.size.m.max}px)`),
	// 	l:	window.matchMedia(`(min-width: ${this.size.l.min}px)	and (max-width: ${this.size.l.max}px)`),
	// 	xl: window.matchMedia(`(min-width: ${this.size.xl.min}px)	and (max-width: ${this.size.xl.max}px)`)
	// };
	screen: Pp2MediaQueryScreen = Pp2MediaQueryScreenConst;
	constructor() {
		// setTimeout(() => {
		// 	this.onWindowResize();
		// }, 1)
		// window.onresize = (e: any) => {
		// 	this.onWindowResize();
		// }
	}
	// onWindowResize(): void {
	// 	this.screen = {
	// 		gt: {
	// 			xs: window.innerWidth > this.size.xs.max,
	// 			s: window.innerWidth > this.size.s.max,
	// 			m: window.innerWidth > this.size.m.max,
	// 			l: window.innerWidth > this.size.l.max,
	// 			xl: window.innerWidth > this.size.xl.max
	// 		},lt: {
	// 			s: window.innerWidth < this.size.s.min,
	// 			m: window.innerWidth < this.size.m.min,
	// 			l: window.innerWidth < this.size.l.min,
	// 			xl: window.innerWidth < this.size.xl.min
	// 		},
	// 		gtOE: {
	// 			xs: window.innerWidth > this.size.xs.min,
	// 			s: window.innerWidth > this.size.s.min,
	// 			m: window.innerWidth > this.size.m.min,
	// 			l: window.innerWidth > this.size.l.min,
	// 			xl: window.innerWidth > this.size.xl.min
	// 		},
	// 		ltOE: {
	// 			xs: window.innerWidth < this.size.xs.max,
	// 			s: window.innerWidth < this.size.s.max,
	// 			m: window.innerWidth < this.size.m.max,
	// 			l: window.innerWidth < this.size.l.max,
	// 			xl: window.innerWidth < this.size.xl.max
	// 		},
	// 		innerHeight: window.innerHeight,
	// 		innerWidth: window.innerWidth,
	// 		outerHeight: window.outerHeight,
	// 		outerWidth: window.outerWidth
	// 	}
	// }
}
