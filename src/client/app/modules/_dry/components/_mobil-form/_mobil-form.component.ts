import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { Upload } from '../../classes/upload.class';

import { _FileImageComponent } from '../../components/_file-image/_file-image.component';

import { Mobil } from '../../interfaces/mobil.interface';

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
		private $_pp2Config: ConfigService,
		private $_pp2Database: DatabaseService<Mobil>,
		public $_pp2Upload: UploadService
	) {
		$_pp2Database.table = 'mobil';
		$_pp2Upload.basePath = 'mobil';
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Tambah Mobil' : 'Ubah Data Mobil';
	}
	ngAfterViewInit() {
		this.C_Pp2_Dry_FI.change.subscribe((e) => {
			this.$_pp2Upload.selectedFiles = this.C_Pp2_Dry_FI.file;
			this.$_pp2Upload.currentUpload = new Upload(this.$_pp2Upload.selectedFiles.item(0));
		})
	}
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.mobilForm = this.$_ngFormBuilder.group(this.mobilFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/assets/img/placeholder-mobil.png';
		if ( id ) {
			this.$_ngHttpClient.get<Mobil>(this.$_pp2Config.baseUrl + '/api/db/file/mobil/get/' + id)
				.subscribe((mobil: Mobil) => {
					this.mobilForm.setValue(this.mobilFormObject(mobil))
					this.C_Pp2_Dry_FI.img.nativeElement.src = mobil.image;
				})
		}
		console.clear()
	}
	mobilFormObject(mobil: Mobil = {}) {
		return {
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
	pp2OnSubmit(e: Event, mobil: Mobil): void {
		e.preventDefault();
		setTimeout(() => {
			let image = this.$_pp2Upload.pushUpload();
			console.log(image)
			console.log(image.url)
			console.log(Object.assign(mobil, {image: image.url}))
			// this.$_pp2Database.create(Object.assign(mobil, {image: image == undefined ? '' : image }));
		}, 1)
	}
}
