import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

import { Pengguna } from '../../interfaces/pengguna.interface';

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
	disable: boolean = false;
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
		private $_Pp2_MQ: Pp2MediaQueryService,
		private $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Daftar Akun Baru' : 'Ubah Data Akun';
	}
	ngAfterViewInit() { }
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.penggunaForm = this.$_ngFormBuilder.group({
			id: [''],
			nama: [''],
			username: [''],
			password: [''],
			noKTP: [''],
			noHP: [''],
			jk: [''],
			email: [''],
			alamat: [''],
			image: [''],
			createdAt: [''],
			updatedAt: ['']
		});
		this.C_Pp2_Dry_FI.img.nativeElement.src = this.$_pp2Conf.baseUrl + '/assets/placeholder-pengguna.png';
		if ( id ) {
			this.$_ngHttpClient.get<Pengguna>(this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/get' + this.$_ngActivatedRoute.snapshot.params['id'])
				.subscribe((pengguna: Pengguna) => {
					this.penggunaForm.setValue({
						id: pengguna.id,
						nama: pengguna.nama,
						username: pengguna.username,
						password: pengguna.password,
						noKTP: pengguna.noKTP,
						noHP: pengguna.noHP,
						jk: pengguna.jk,
						email: pengguna.email,
						alamat: pengguna.alamat,
						image: pengguna.image,
						createdAt: pengguna.createdAt,
						updatedAt: pengguna.updatedAt
					})
					this.C_Pp2_Dry_FI.img.nativeElement.src = this.$_pp2Conf.baseUrl + '/uploads/pengguna/' + pengguna.image;
				})
		}
		this.disableForm();
		this.penggunaForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(): void {
		if (this.$_ngActivatedRoute.data['value']['type'] === 'ubah') {
			this.disable = false || !this.penggunaForm.valid;
		}
		if ((this.$_ngActivatedRoute.data['value']['type'] === 'tambah')) {
			try {
				if (this.C_Pp2_Dry_FI.i_file.files) {
					this.disable = false || !this.penggunaForm.valid;
				}
			} catch (e) {
				this.disable = true;
			}
		} else { this.disable = false || !this.penggunaForm.valid; }
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, val): void {
		e.preventDefault();
		const url = this.$_pp2Conf.baseUrl + '/api/db/file/pengguna/' + (this.$_ngActivatedRoute.data['value']['type'] === 'tambah' ? 'post' : 'put');
		this.C_Pp2_Dry_FI.save(url, val, this.$_ngActivatedRoute.data['value']['type'], ['pengurus', 'pengguna', 'lihat'])
	}
}
