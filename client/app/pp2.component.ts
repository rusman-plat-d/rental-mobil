import { HttpClient } from '@angular/common/http';
import { Component, OnInit, isDevMode } from '@angular/core';

import { ConfigService, DatabaseService, Mobil, Pengguna, Pp2Service, Sewa, Supir } from './modules/_dry/index';

@Component({
	selector: 'pp2-root',
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class Pp2Component implements OnInit {
	title = 'pp2';
	_mobilDatabase: DatabaseService = new DatabaseService(this.$_ngHttpClient, this.$_pp2Conf);
	_supirDatabase: DatabaseService = new DatabaseService(this.$_ngHttpClient, this.$_pp2Conf);
	_sewaDatabase: DatabaseService = new DatabaseService(this.$_ngHttpClient, this.$_pp2Conf);
	_penggunaDatabase: DatabaseService = new DatabaseService(this.$_ngHttpClient, this.$_pp2Conf);
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_pp2Conf: ConfigService
	){
		this._mobilDatabase.init<Mobil>(this.$_pp2Conf.baseUrl + '/api/db/file/mobil/gets', 'mobil');
		this._supirDatabase.init<Supir>(this.$_pp2Conf.baseUrl + '/api/db/file/supir/gets', 'supir');
		this._sewaDatabase.init<Sewa>(this.$_pp2Conf.baseUrl + '/api/db/file/sewa/gets', 'sewa');
		this._penggunaDatabase.init<Pengguna>(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/gets', 'pengguna');
	}
	ngOnInit() {
		// if (!isDevMode()) {
		// 	const swRegister = window.document.createElement('script');
		// 	swRegister.src = 'assets/sw-register.js';
		// 	document.body.appendChild(swRegister);
		// }
	}
}
