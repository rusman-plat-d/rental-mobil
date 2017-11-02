import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';
import { Supir } from '../../interfaces/supir.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';
import { CONFIG } from '../../../_dry/consts/config.const';


declare var io: any;

@Component({
	selector: "pp2-dry-supirForm",
	templateUrl: "_supir-form.component.html",
	styles: [`
		
	`]
})
export class _SupirFormComponent implements OnDestroy, OnInit {
	@ViewChild('fi') _Pp2_dry_fi: _FileImageComponent;
	$Socket: Server;
	supirForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_Mat_FBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngRoute: ActivatedRoute
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
		this.supirForm = this.$_Mat_FBuilder.group({
			noSIM: [""],
			nama: [""],
			jk: [""],
			noHP: [""],
			alamat: [""],
			email: [""]
		});
		this._Pp2_dry_fi.imageSrc = 'gg.png';
		if ( this.$_ngRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngRoute.snapshot.params['id'], (Supir: Supir) => {
				this.supirForm.setValue({
					noSIM: Supir.noSIM,
					nama: Supir.nama,
					jk: Supir.jk,
					noHP: Supir.noHP,
					alamat: Supir.alamat,
					email: Supir.email
				})
				this._Pp2_dry_fi.imageSrc = Supir.image;
			})
		}
		
	}
	pp2OnSubmit(val) {
		this._Pp2_dry_fi.save(this.$Socket, Object.assign(val, {
			id: ((Math.random() * Math.random() * 1000).toString()
					+(Math.random() * Math.random() * 1000).toString()
					+Date.now()
					+(Math.random() * Math.random() * 1000).toString())
					.replace('.', '').replace('.', '').replace('.', '')
		}))
	}
}
