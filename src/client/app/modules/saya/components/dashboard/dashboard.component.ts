import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pp2-saya-dashboard',
	template: `
		<pp2-saya-nav #C_Pp2_Saya__Nav></pp2-saya-nav>
		pp2-saya-dashboard works!
	`
})
export class DashboardComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}