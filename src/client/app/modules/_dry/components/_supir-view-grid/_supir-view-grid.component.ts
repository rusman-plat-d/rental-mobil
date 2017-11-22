import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { _ContainerComponent } from '../_container/_container.component';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { Supir } from '../../interfaces/supir.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

declare var io: SocketIOStatic;

@Component({
	selector: 'pp2-dry-supirViewGrid',
	templateUrl: '_supir-view-grid.component.html',
	styles: [``]
})
export class _SupirViewGridComponent implements AfterViewInit, OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	$Socket: Server;
	get Supir$(): Supir[] { return this._database.dataChange.value; }
	get cols(): number {
		if ( this.$_pp2MQ.screen.gtOE.l )
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
		this.$Socket = io($_pp2Conf.socket + '/db/supir')
		_database.init<Supir>('supir', '/db/supir', '_status', 'Tersedia');
	}
	ngAfterViewInit() {}
	ngOnInit() {}
	pindah(ke){
		this.$_ngRouter.navigate(['saya', 'sewa', `("s":"${ke}")`]);
	}
}
