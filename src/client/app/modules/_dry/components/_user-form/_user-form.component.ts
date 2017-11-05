import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';
import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';
import { User } from '../../interfaces/user.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';
import { CONFIG } from '../../../_dry/consts/config.const';


declare var io: any;

@Component({
	selector: "pp2-dry-userForm",
	templateUrl: "_user-form.component.html",
	styles: [``]
})
export class _UserFormComponent implements OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_dry_fi: _FileImageComponent;
	disable: boolean = false;
	$Socket: Server;
	userForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_ngFormBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket+'/db/user');
		setTimeout(() => {
			this.disableForm();
		},1000)
	}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.userForm = this.$_ngFormBuilder.group({
			id: [''],
			nama: [''],
			noKTP: [''],
			noHP: [''],
			jk: [''],
			email: [''],
			alamat: [''],
			image: [''],
			createdAt: [''],
			updatedAt: ['']
		});
		this.C_Pp2_dry_fi.img.nativeElement.src = CONFIG.socket + '/uploads/user/gg.png';
		if ( this.$_ngActivatedRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngActivatedRoute.snapshot.params['id'], (user: User) => {
				this.userForm.setValue({
					id: user.id,
					nama: user.nama,
					noKTP: user.noKTP,
					noHP: user.noHP,
					jk: user.jk,
					email: user.email,
					alamat: user.alamat,
					image: user.image
				})
				this.C_Pp2_dry_fi.img.nativeElement.src = CONFIG.socket + '/uploads/User/' + user.image;
			})
		}
		this.userForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(): void {
		if ( this.$_ngActivatedRoute.data['value']['type'] === 'ubah' ) {
			this.disable = false || !this.userForm.valid;
		}
		if ( (this.$_ngActivatedRoute.data['value']['type'] === 'tambah') ) {
			try{
				if ( this.C_Pp2_dry_fi.i_file.files ) {
					this.disable = false || !this.userForm.valid;
				}
			}catch(e){
				this.disable = true || !this.userForm.valid;
			}
		}else{ this.disable = false || !this.userForm.valid; }
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event,val): void {
		e.preventDefault();
		try{
			if ( this.C_Pp2_dry_fi.i_file['files'] ) {
				if ( this.$_ngActivatedRoute.data['value']['type'] === 'tambah' ) {
					Object.assign(val, {
						id: ((Math.random() * Math.random() * 1000).toString()
								+Date.now()
								+(Math.random() * Math.random() * 1000).toString())
								.replace('.', '').replace('.', '').replace('.', '').replace('.', '')
					})
				}
				this.C_Pp2_dry_fi.save(this.$Socket, val, this.$_ngActivatedRoute.data['value']['type'], ['su','user','lihat'])
			}
		}catch(e){
			this.$Socket.emit('update', val);
			this.$_ngRouter.navigate(['su','user','lihat'])
		}
	}
}
