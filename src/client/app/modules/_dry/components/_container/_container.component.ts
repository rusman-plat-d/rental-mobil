import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

@Component({
	selector: 'pp2-dry-container',
	templateUrl: '_container.component.html',
	styles: [`
		.mat-sidenav-content{
			padding-top: 64px;
			height: calc(100vh - 64px);
			overflow-y: scroll;
		}
		@media (max-width: 600px) {
			.mat-sidenav-content{
				padding-top: 56px;
				height: calc(100vh - 56px);
				overflow-y: scroll;
			}
		}
	`]
})

export class _ContainerComponent implements OnInit {
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService
	) {}
	ngOnDestroy() {}
	ngOnInit() {}
	gg() {
		return this.$_Pp2MQ.screen.lt.xl ? 'FOO' : 'BAR';
	}
}
