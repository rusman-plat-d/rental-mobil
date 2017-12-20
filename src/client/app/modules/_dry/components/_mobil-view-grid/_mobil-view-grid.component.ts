import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { _ContainerComponent } from '../_container/_container.component';

import { Mobil } from '../../interfaces/mobil.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

@Component({
	selector: 'pp2-dry-mobilViewGrid',
	templateUrl: '_mobil-view-grid.component.html',
	styles: [`
		.mat-grid-tile-content{
			& img, & p{
				margin: 0 !important;
				padding: 0 !important;
			}
		}
	`]
})

export class _MobilViewGridComponent implements AfterViewInit, OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	get data(): Mobil[] { return this._database.dataChange.value; }
	get cols(): number {
		if (this.$_pp2MQ.screen.gtOE.l)
			return 3;
		else if (this.$_pp2MQ.screen.gtOE.s)
			return 2;
		else
			return 1;
	}
	constructor(
		public $_pp2Conf: ConfigService,
		public _database: DatabaseService,
		public $_pp2MQ: Pp2MediaQueryService,
		public $_ngRouter: Router
	) {
		_database.init<Mobil>(this.$_pp2Conf.baseUrl + '/api/db/file/mobil/gets', 'mobil', '_status', 'Tersedia');
	}
	ngAfterViewInit() { }
	ngOnInit() {}
	pindah(ke) {
		this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${ke}")`]);
	}
}
