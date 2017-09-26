import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

import { Pengguna, PenggunaId } from '../../interfaces/pengguna.interface';

@Component({
	selector: "pp2-dry-penggunaForm",
	templateUrl: "_pengguna-form.component.html",
	styles: [`
		.pp2-dry-penggunaForm-container{
			height: 100%;
			width: 100%;
		}
	`]
})
export class _PenggunaFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;

	cities: string[] = ['Bandung', 'Cirebon', 'Jakarta', 'Padang'];
	get disable() { return false || !this.penggunaForm.valid; }
	label: string;
	penggunaForm: FormGroup;
	sembunyikan = false;
	type: string;
	private _pt = 'password';
	get pt() {
		return this._pt;
	}
	set pt(val) {
		this._pt = val;
		setTimeout(() => {
			this._pt = 'password';
		}, 100)
	}
	constructor(
		private $_matSnackBar: MatSnackBar,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public $_pp2Config: ConfigService,
		public $_pp2Database: DatabaseService<PenggunaId>,
		public $_pp2Upload: UploadService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Daftar Akun Baru' : 'Ubah Data Akun';
	}
	ngAfterViewInit() { }
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.penggunaForm = this.$_ngFormBuilder.group(this.penggunaFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/uploads/pengguna/placeholder.png';
		if ( id ) {
			this.$_ngHttpClient.get<PenggunaId>(this.$_pp2Config.baseUrl + '/api/db/file/pengguna/get' + this.$_ngActivatedRoute.snapshot.params['id'])
				.subscribe((pengguna: PenggunaId) => {
					this.penggunaForm.setValue(this.penggunaFormObject(pengguna))
					this.C_Pp2_Dry_FI.img.nativeElement.src = '/uploads/pengguna/' + pengguna.image;
				})
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	penggunaFormObject(pengguna?: PenggunaId){
		return {
			id: pengguna.id || [''],
			nama: pengguna.nama || [''],
			username: pengguna.username || [''],
			password: pengguna.password || [''],
			noKTP: pengguna.noKTP || [''],
			noHP: pengguna.noHP || [''],
			jk: pengguna.jk || [''],
			email: pengguna.email || [''],
			alamat: pengguna.alamat || [''],
			image: pengguna.image || [''],
			createdAt: pengguna.createdAt || [''],
			updatedAt: pengguna.updatedAt || ['']
		}
	}
	pp2OnSubmit(e: Event, pengguna: PenggunaId): void {
		e.preventDefault();
		const type: 'tambah' | 'ubah' = this.$_ngActivatedRoute.data['value']['type'];
		if ( type === 'tambah' || (type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) )
			pengguna.image = this.$_pp2Upload.uploadSingle().url;
		this.$_pp2Database.create(pengguna);
	}
}
