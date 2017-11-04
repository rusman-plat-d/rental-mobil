import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';
import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';
import { Supir } from '../../interfaces/supir.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';
import { CONFIG } from '../../../_dry/consts/config.const';


declare var io: any;

@Component({
	selector: "pp2-dry-supirForm",
	templateUrl: "_supir-form.component.html",
	styles: [``]
})
export class _SupirFormComponent implements OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_dry_fi: _FileImageComponent;
	disable: boolean = false;
	$Socket: Server;
	supirForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_ngFormBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket+'/db/supir');
		this.disableForm();
	}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.supirForm = this.$_ngFormBuilder.group({
			id: [""],
			noSIM: [""],
			nama: [""],
			jk: [""],
			noHP: [""],
			alamat: [""],
			email: [""],
			image: [""]
		});
		this.C_Pp2_dry_fi.img.nativeElement.src = CONFIG.socket + '/uploads/supir/gg.png';
		if ( this.$_ngActivatedRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngActivatedRoute.snapshot.params['id'], (Supir: Supir) => {
				this.supirForm.setValue({
					id: Supir.id,
					noSIM: Supir.noSIM,
					nama: Supir.nama,
					jk: Supir.jk,
					noHP: Supir.noHP,
					alamat: Supir.alamat,
					email: Supir.email,
					image: Supir.image
				})
				this.C_Pp2_dry_fi.img.nativeElement.src = CONFIG.socket + '/uploads/supir/' + Supir.image;
			})
		}
		this.supirForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(){
		if ( this.$_ngActivatedRoute.data['value']['type'] === 'ubah' ) {
			this.disable = false;
		}
		if ( (this.$_ngActivatedRoute.data['value']['type'] === 'tambah') ) {
			try{
				if ( this.C_Pp2_dry_fi.i_file.files ) {
					this.disable = false;
				}
			}catch(e){
				this.disable = true;
			}
		}else{ this.disable = false }
	}
	tooltipMsg(){
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event,val) {
		e.preventDefault();
		try{
			if ( this.C_Pp2_dry_fi.i_file['files'] ) {
				alert('w/ image ||  ' + this.$_ngActivatedRoute.data['value']['type'])
				if ( this.$_ngActivatedRoute.data['value']['type'] === 'tambah' ) {
					Object.assign(val, {
						id: ((Math.random() * Math.random() * 1000).toString()
								+Date.now()
								+(Math.random() * Math.random() * 1000).toString())
								.replace('.', '').replace('.', '').replace('.', '').replace('.', '')
					})
				}
				this.C_Pp2_dry_fi.save(this.$Socket, val, this.$_ngActivatedRoute.data['value']['type'], ['su','supir','lihat'])
			}
		}catch(e){
			this.$Socket.emit('update', val);
			this.$_ngRouter.navigate(['su','supir','lihat'])
		}
	}
}
