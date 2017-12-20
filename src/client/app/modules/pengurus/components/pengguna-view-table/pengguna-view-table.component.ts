import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _PenggunaViewTableComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-pengurus-penggunaViewTable',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-penggunaViewTable #C_Pp2_Dry_penggunaViewTable></pp2-dry-penggunaViewTable>
	`
})
export class PenggunaViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_penggunaViewTable') C_Pp2_Dry_PenggunaViewTable: _PenggunaViewTableComponent;
	constructor(){}
	ngAfterViewInit() {
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_PenggunaViewTable.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()
		})
	}
	ngOnInit(){}
}
