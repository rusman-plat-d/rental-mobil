import { Component, OnInit } from '@angular/core';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

@Component({
	selector: 'pp2-container',
	templateUrl: '_container.component.html',
	styles: [``]
})

export class _ContainerComponent implements OnInit {
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService
	) { }

	ngOnInit() { }
}
