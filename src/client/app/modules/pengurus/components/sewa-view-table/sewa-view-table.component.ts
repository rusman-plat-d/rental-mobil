import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _SewaViewTableComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-pengurus-sewaViewTable',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-sewaViewTable #C_Pp2_Dry_SewaViewTable></pp2-dry-sewaViewTable>
	`
})
export class SewaViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_SewaViewTable') C_Pp2_Dry_SewaViewTable: _SewaViewTableComponent;
	constructor() { }
	ngAfterViewInit() {
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_SewaViewTable.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnInit() { }
}
