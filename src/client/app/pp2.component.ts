import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
	selector: 'pp2-root',
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class Pp2Component implements OnInit {
	title = 'pp2';
	constructor() {}
	ngOnInit() {}
}
