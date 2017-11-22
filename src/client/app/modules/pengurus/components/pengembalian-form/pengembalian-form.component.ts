import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _PengembalianFormComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-pengurus-pengembalianForm',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-pengembalianForm #C_Pp2_Dry_PengembalianForm></pp2-dry-pengembalianForm>
	`
})
export class PengembalianFormComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_PengembalianForm') C_Pp2_Dry_PengembalianForm: _PengembalianFormComponent;
	constructor() { }
	ngAfterViewInit() {
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_PengembalianForm.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnInit() { }
}
