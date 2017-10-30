import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';
import { Server } from '../../../_dry/interfaces/socket.interface';
import { CONFIG } from '../../../_dry/consts/config.const';

declare var io: any;

@Component({
	selector: "pp2-su-supir-form",
	templateUrl: "_supir-form.component.html",
	styles: [`
		.pp2-su-supir-form-container{
			height: 200px;
		}
	`]
})
export class Pp2SuSupirFormComponent implements OnDestroy, OnInit {
	@ViewChild('fi') _Pp2_dry_fi: _FileImageComponent;
	$Socket: Server;
	ggForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_Mat_FBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		cRef: ViewContainerRef
	) {
		this.$Socket = io(CONFIG.socket+'/db/supir');
		this.$Socket.on('connect', (_Socket) => {
			// console.log('socket: ')
		})
	}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.ggForm = this.$_Mat_FBuilder.group({
			noSIM: [""],
			nama: [""],
			jk: [""],
			noHp: [""],
			alamat: [""],
			email: [""]
		});
	}
	pp2OnSubmit(val) {
		alert('submited');
		this._Pp2_dry_fi.save(this.$Socket, val)
		console.log(this.$Socket);
	}
}
