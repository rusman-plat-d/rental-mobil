import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { _ContainerComponent, _NavComponent } from '../../../_dry/index';

declare var localStorage: Storage;

@Component({
	selector: 'pp2-masuk-pengguna',
	templateUrl: './pengguna.component.html'
})
export class PenggunaComponent implements OnInit {

	masukPenggunaForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder, private $_ngRouter: Router
	) {
		this.masukPenggunaForm = $_ngFormBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}
	ngOnInit() {}
	onSubmit(masukPenggunaForm): void {
		localStorage.masukPengguna = JSON.stringify({
			username: masukPenggunaForm.username,
			password: masukPenggunaForm.password,
			createdAt: Date.now()
		});
		this.$_ngRouter.navigate(['saya']);
	}
	onKeyPress($event: KeyboardEvent): void {
		const number = ($event.charCode >= 48) && ($event.charCode <= 57);
		const _ = ($event.charCode === 95);
		const alphabet = ($event.charCode >= 97) && ($event.charCode <= 122);
		const ALPHABET = ($event.charCode >= 65) && ($event.charCode <= 90);
		const tab = $event.keyCode === 9;
		if ( !( number || _ || alphabet || ALPHABET || tab) ) {
			$event.preventDefault();
		}
	}
	onPaste( $event: any ): void {
		setTimeout(() => {
			const val = this.masukPenggunaForm.get('username').value;
			const result = val.replace(/[\s\r\n\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?]/gi, '');
			this.masukPenggunaForm.get('username').setValue(result);
		}, 1);
	}
}
