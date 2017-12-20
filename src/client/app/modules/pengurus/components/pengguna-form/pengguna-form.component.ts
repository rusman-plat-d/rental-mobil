import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _PenggunaFormComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-pengurus-userForm',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-penggunaForm #C_Pp2_Dry_penggunaForm></pp2-dry-penggunaForm>
	`
})
export class PenggunaFormComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_penggunaForm') C_Pp2_Dry_penggunaForm: _PenggunaFormComponent;
	constructor() {}
	ngAfterViewInit() {
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_penggunaForm.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()
		})
	}
	ngOnInit() {}
}
