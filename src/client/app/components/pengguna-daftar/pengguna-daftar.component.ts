import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _PenggunaFormComponent } from '../../modules/_dry/index';

@Component({
	selector: 'pp2-penggunaDaftar',
	template: `
		<pp2--nav #C_Pp2__Nav></pp2--nav>
		<pp2-dry-penggunaForm #C_Dry_penggunaForm></pp2-dry-penggunaForm>
	`
})
export class PenggunaDaftarComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('C_Dry_penggunaForm') C_Dry_penggunaForm: _PenggunaFormComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{this.C_Dry_penggunaForm.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
	}
	ngOnInit() {}
}
