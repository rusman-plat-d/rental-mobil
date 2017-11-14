import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketIOStatic, Server } from '../../interfaces/socket.interface';
import { Mobil } from '../../interfaces/mobil.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

declare var io: SocketIOStatic;

@Component({
	selector: 'pp2-dry-mobilViewGrid',
	templateUrl: '_mobil-view-grid.component.html',
	styles: [``]
})

export class _MobilViewGridComponent implements AfterViewInit, OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	$Socket: Server;
	get data(): Mobil[] { return this._database.dataChange.value; }
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
		this.$Socket = io($_pp2Conf.socket + '/db/mobil')
		_database.init<Mobil>('mobil', '/db/mobil');
	}
	ngAfterViewInit() {}
	ngOnInit() {}
	pindah(ke){
		this.$_ngRouter.navigate(['saya', 'sewa', ke]);
	}
}
