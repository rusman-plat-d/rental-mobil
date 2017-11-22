import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { _ContainerComponent } from '../_container/_container.component';
import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

import { Server } from '../../../_dry/interfaces/socket.interface';

declare var io: any;

@Component({
	selector: "pp2-dry-pengembalianForm",
	templateUrl: "_pengembalian-form.component.html",
	styles: [`
		.pp2-dry-pengembalianForm-container{
			height: 100%;
			width: 100%;
		}
	`]
})
export class _PengembalianFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;

	type: string;
	label: string;
	disable: boolean = false;
	$Socket: Server;
	pengembalianForm: FormGroup;
	constructor(
		public $_ngFormBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService,
		private $_matSnackBar: MatSnackBar
	) {
		this.$Socket = io($_pp2Conf.socket+'/db/Pengembalian');
		this.type = $_ngActivatedRoute.data['value']['type'];
	}
	ngAfterViewInit(){}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.pengembalianForm = this.$_ngFormBuilder.group({
			id: [''],
			kondisi: [''],
			denda: ['']
		});
		if ( this.$_ngActivatedRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngActivatedRoute.snapshot.params['id'], (pengembalian) => {
				this.pengembalianForm.setValue({
					id: '',
					kondisi: '',
					denda: ''
				})
			})
		}
	}
	
	pp2OnSubmit(e: Event,val): void {
		e.preventDefault();
		try{
		}catch(e){
			this.$Socket.emit('update', val);
			// this.$_ngRouter.navigate(['su','Pengembalian','lihat'])
			this.$_ngRouter.navigate([''])
			this.$_matSnackBar.open('Akun Berhasil Didaftarkan')
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000)
		}
	}
}
