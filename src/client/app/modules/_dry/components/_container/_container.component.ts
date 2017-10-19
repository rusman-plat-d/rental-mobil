import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';
import { Pp2MediaQueryScreenConst } from '../../consts/Pp2MediaQueryScreen.const';
import { Pp2MediaQueryScreen } from '../../interfaces/Pp2-media-query.interface';

@Component({
	selector: 'pp2-dry-container',
	templateUrl: '_container.component.html',
	styles: [``]
})

export class _ContainerComponent implements OnInit {
	$$_Pp2MQ: { screen: Pp2MediaQueryScreen } = { screen: Pp2MediaQueryScreenConst };
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService
	) {
		this.$_Pp2MQ.screen.subscribe((screen: Pp2MediaQueryScreen) => {
			this.$$_Pp2MQ.screen = screen;
		});
	}
	ngOnDestroy() {
		// this.$_Pp2MQ.screen.unsubscribe();
	}
	ngOnInit() { }
}
