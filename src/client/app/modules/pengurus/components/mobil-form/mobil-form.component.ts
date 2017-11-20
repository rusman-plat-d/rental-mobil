import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _MobilFormComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-pengurus-mobilForm',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-mobilForm #C_Pp2_Dry_MobilForm></pp2-dry-mobilForm>
	`
})
export class MobilFormComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_MobilForm') C_Pp2_Dry_MobilForm: _MobilFormComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_MobilForm.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()
		})
	}
	ngOnInit() {}
}
