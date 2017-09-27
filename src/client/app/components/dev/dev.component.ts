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
	daftar = ('Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmo tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum').split(' ')
	sembunyikan = false;
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService,
		public $_ngRouter: Router,
		@Inject(DOCUMENT) public $_ngDOCUMENT
	) {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
		setInterval(() => {
			this.sembunyikan = !this.sembunyikan
		}, 4000)
	}
	ngOnInit() {}
}