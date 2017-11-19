import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _UserFormComponent } from '../../modules/_dry/index';

@Component({
	selector: 'pp2-userRegister',
	template: `
		<pp2--nav #C_Pp2__Nav></pp2--nav>
		<pp2-dry-userForm #C_Dry_userForm></pp2-dry-userForm>
	`
})
export class UserRegisterComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('C_Dry_userForm') C_Dry_userForm: _UserFormComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{
			this.C_Dry_userForm.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnInit() {}
}
