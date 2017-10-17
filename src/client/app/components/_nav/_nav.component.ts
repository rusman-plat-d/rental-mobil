import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pp2-nav',
	templateUrl: '_nav.component.html'
})

export class _NavComponent implements OnInit {
	links: { url: string, text: string }[] = [];
	constructor() { }

	ngOnInit() {
		this.links = [
			{ url: '/', text: 'Home' },
			{ url: '/dev', text: 'Dev' }
		]
	}
}
