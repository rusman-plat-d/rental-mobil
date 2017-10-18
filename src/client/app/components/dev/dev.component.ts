import { Component, OnInit } from '@angular/core';
import { Pp2MediaQueryService } from '../../modules/_dry/services/Pp2-media-query.service';

@Component({
	selector: 'pp2-dev',
	templateUrl: 'dev.component.html',
	styleUrls: ['dev.component.scss']
})

export class DevComponent implements OnInit {
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService
	) { }

	ngOnInit() {

	}
}
