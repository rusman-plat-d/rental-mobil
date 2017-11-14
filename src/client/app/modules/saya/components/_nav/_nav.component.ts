import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from '../../../_dry/index';

@Component({
	selector: 'pp2-saya-nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class NavComponent_ implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	saya: User;
	constructor(){}
	ngOnInit() {
		try{
			this.saya = JSON.parse(localStorage.ggPengguna);
		}catch(e){}
	}
}
