import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { MobilId } from '../../interfaces/mobil.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: "pp2-dry-mobilForm",
	templateUrl: "_mobil-form.component.html",
	styles: [`
		.pp2-dry-mobilForm-container{
			height: 100%;
			width: 100%;
		}
	`]
})
export class _MobilFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;

	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	get disable() { return false || !this.mobilForm.valid; }
	label: string;
	mobilForm: FormGroup;
	sembunyikan = false;
	type: string;
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public $_pp2Config: ConfigService,
		public $_pp2Database: DatabaseService<MobilId>,
		public $_pp2Upload: UploadService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Tambah Mobil' : 'Ubah Data Mobil';
	}
	ngAfterViewInit() {}
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.mobilForm = this.$_ngFormBuilder.group(this.mobilFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/uploads/mobil/placeholder.png';
		if ( id ) {
			this.$_ngHttpClient.get<MobilId>(this.$_pp2Config.baseUrl + '/api/db/file/mobil/get/' + id)
				.subscribe((mobil: MobilId) => {
					this.mobilForm.setValue(this.mobilFormObject(mobil))
					this.C_Pp2_Dry_FI.img.nativeElement.src = '/uploads/mobil/' + mobil.image;
				})
		}
	}
	mobilFormObject(mobil?: MobilId) {
		return {
			id: mobil.id || [''],
			nama: mobil.nama || [''],
			platNo: mobil.platNo || [''],
			kursi: mobil.kursi || [''],
			bensin: mobil.bensin || [''],
			hargaSewa: mobil.hargaSewa || [''],
			image: mobil.image || [''],
			kondisi: mobil.kondisi || [''],
			_status: mobil._status || [''],
			_disewa: mobil._disewa || [''],
			_disewaSampai: mobil._disewaSampai || [''],
			createdAt: mobil.createdAt || [''],
			updatedAt: mobil.updatedAt || ['']
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, mobil: MobilId): void {
		e.preventDefault();
		const type: 'tambah' | 'ubah' = this.$_ngActivatedRoute.data['value']['type'];
		if ( type === 'tambah' || (type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) )
			mobil.image = this.$_pp2Upload.uploadSingle().url;
		this.$_pp2Database.create(mobil);
	}
}
