import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { _ContainerComponent, Pp2MediaQueryService } from '../../modules/_dry/index';
import { NavComponent_ } from '../_nav/_nav.component';

@Component({
	selector: 'pp2-dev',
	templateUrl: 'dev.component.html',
	styleUrls: ['dev.component.scss']
})

export class DevComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService,
		public $_ngRouter: Router,
		@Inject(DOCUMENT) public $_ngDOCUMENT
	) {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
		for (let i in this.$_ngDOCUMENT) {
			console.log(i, this.$_ngDOCUMENT[ i ])
		}
	}
	ngOnInit() {}
}
