import { Component, OnInit, isDevMode } from '@angular/core';

import { DatabaseService, ConfigService, Pp2Service } from './modules/_dry/index';

declare var window: Window,
			require: any;

@Component({
	selector: 'pp2-root',
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class Pp2Component implements OnInit {
	title = 'pp2';
	_mobilDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_supirDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_sewaDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_userDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	constructor(
		public $_pp2Conf: ConfigService
	){
		this._mobilDatabase.init('mobil', '/db/mobil');
		this._supirDatabase.init('supir', '/db/supir');
		this._sewaDatabase.init('sewa', '/db/sewa');
		this._userDatabase.init('user', '/db/user');
	}
	ngOnInit() {
		// if (!isDevMode()) {
		// 	const swRegister = window.document.createElement('script');
		// 	swRegister.src = 'assets/sw-register.js';
		// 	window.document.body.appendChild(swRegister);
		// }
	}
}
