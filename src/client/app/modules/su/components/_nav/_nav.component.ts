import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'pp2-su-nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class _NavComponent implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	constructor() {}
	ngOnInit() {}
}
