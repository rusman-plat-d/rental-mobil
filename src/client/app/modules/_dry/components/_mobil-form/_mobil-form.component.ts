import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';
import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';
import { Mobil } from '../../interfaces/mobil.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';

declare var io: any;

@Component({
	selector: "pp2-dry-mobilForm",
	templateUrl: "_mobil-form.component.html",
	styles: [``]
})
export class _MobilFormComponent implements OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_dry_fi: _FileImageComponent;
	disable: boolean = false;
	$Socket: Server;
	mobilForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_ngFormBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket+'/db/mobil');
		this.disableForm();
	}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.mobilForm = this.$_ngFormBuilder.group({
			id: [''],
			nama: [''],
			platNo: [''],
			kursi: [''],
			bensin: [''],
			hargaSewa: [''],
			image: [''],
			kondisi: [''],
			_status: [''],
			_disewa: ['0'],
			_disewaSampai: [''],
			createdAt: [''],
			updatedAt: [''],
		});
		this.C_Pp2_dry_fi.img.nativeElement.src = this.$_pp2Conf.socket + '/uploads/mobil/gg.png';
		if ( this.$_ngActivatedRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngActivatedRoute.snapshot.params['id'], (Mobil: Mobil) => {
				this.mobilForm.setValue({
					id: Mobil.id,
					nama: Mobil.nama,
					platNo: Mobil.platNo,
					kursi: Mobil.kursi,
					bensin: Mobil.bensin,
					hargaSewa: Mobil.hargaSewa,
					image: Mobil.image,
					kondisi: Mobil.kondisi,
					_status: Mobil._status,
					_disewa: Mobil._disewa,
					_disewaSampai: Mobil._disewaSampai,
					createdAt: Mobil.createdAt,
					updatedAt: Mobil.updatedAt
				})
				this.C_Pp2_dry_fi.img.nativeElement.src = this.$_pp2Conf.socket + '/uploads/mobil/' + Mobil.image;
			})
		}
		this.mobilForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(): void {
		if ( this.$_ngActivatedRoute.data['value']['type'] === 'ubah' ) {
			this.disable = false || !this.mobilForm.valid;
		}
		if ( (this.$_ngActivatedRoute.data['value']['type'] === 'tambah') ) {
			try{
				if ( this.C_Pp2_dry_fi.i_file.files ) {
					this.disable = false || !this.mobilForm.valid;
				}
			}catch(e){
				this.disable = true || !this.mobilForm.valid;
			}
		}else{ this.disable = false || !this.mobilForm.valid }
	}
	tooltipMsg(): string{
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event,val): void {
		e.preventDefault();
		console.log(val)
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
				this.C_Pp2_dry_fi.save(this.$Socket, val, this.$_ngActivatedRoute.data['value']['type'], ['su','mobil','lihat'])
			}
		}catch(e){
			this.$Socket.emit('update', val);
			this.$_ngRouter.navigate(['su','mobil','lihat'])
		}
	}
}
