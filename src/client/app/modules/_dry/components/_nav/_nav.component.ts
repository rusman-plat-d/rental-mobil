import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'pp2-dry-nav',
	templateUrl: '_nav.component.html',
	styles: [`
		.mat-toolbar a {
			margin: none 10px !important;
		}
		.pp2-dry-nav{
			position: fixed;
			z-index: 50000 !important;
			top: 0;
			left: 0;
			width: 100vw;
		}
	`]
})

export class _NavComponent implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	links: { url: string, text: string }[] = [];
	constructor() { }

	ngOnInit() {
		this.links = [
			{ url: '/', text: 'Home' },
			{ url: '/dev', text: 'Dev' }
		]
	}
}
