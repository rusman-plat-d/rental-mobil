import { Component, OnInit, isDevMode } from '@angular/core';

declare var window: Window;

@Component({
	selector: 'pp2-root',
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class Pp2Component implements OnInit {
	title = 'pp2';
	ngOnInit() {
		// if (!isDevMode()) {
		// 	const swRegister = window.document.createElement('script');
		// 	swRegister.src = 'assets/sw-register.js';
		// 	window.document.body.appendChild(swRegister);
		// }
	}
}
