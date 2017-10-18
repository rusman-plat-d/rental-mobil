import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'pp2-nav',
	templateUrl: '_nav.component.html',
	styles: [`
		.mat-toolbar a {
			margin: none 10px !important;
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
