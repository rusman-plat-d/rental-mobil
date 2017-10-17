import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pp2-sidenav',
	templateUrl: '_sidenav.component.html'
})

export class _SidenavComponent implements OnInit {
	links: { url: string, text: string }[] = [];
	constructor() { }

	ngOnInit() {
		this.links = [
			{ url: '/', text: 'Home' },
			{ url: '/dev', text: 'Dev' }
		]
	}
}
