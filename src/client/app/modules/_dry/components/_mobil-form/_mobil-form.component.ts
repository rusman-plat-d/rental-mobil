import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Upload } from '../../classes/upload.class';

import { _FileImageComponent } from '../../components/_file-image/_file-image.component';

import { Mobil$Key } from '../../interfaces/mobil.interface';

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

	get disable() { return !this.mobilForm.valid; }
	$_pp2Upload: UploadService = new UploadService(this.$_ngfDatabase);
	$_pp2Database: DatabaseService<Mobil$Key> = new DatabaseService(this.$_ngfDatabase);
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	label: string;
	mobilForm: FormGroup;
	sembunyikan = false;
	type: string;
	
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ngfDatabase: AngularFireDatabase,
		private $_pp2Config: ConfigService,
	) {
		this.$_pp2Database.table = 'mobil';
		this.$_pp2Upload.basePath = 'mobil';
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
			this.$_pp2Database.$data$.subscribe(($mobil) => {
				const mobil = $mobil.filter(mobil => mobil.$key == id)[0]
				this.mobilForm.setValue(this.mobilFormObject(mobil))
				this.C_Pp2_Dry_FI.img.nativeElement.src = mobil.image;
			})
		}
	}
	mobilFormObject(mobil: Mobil$Key = {}) {
		return {
			$key: [''],
			nama: mobil.nama || [''],
			platNo: mobil.platNo || [''],
			kursi: mobil.kursi || [''],
			bensin: mobil.bensin || [''],
			hargaSewa: mobil.hargaSewa || [''],
			image: mobil.image || [''],
			kondisi: mobil.kondisi || [''],
			_status: mobil._status || ['Tersedia'],
			_disewa: mobil._disewa || ['0'],
			_disewaSampai: mobil._disewaSampai || ['0'],
			createdAt: mobil.createdAt || ['0'],
			updatedAt: mobil.updatedAt || ['0']
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, mobil: Mobil$Key): void {
		e.preventDefault();
		if ( this.type == 'tambah' || (this.type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) ) {
			this.$_pp2Upload.$upload$.subscribe((e: Upload)=>{
				delete mobil.$key;
				this.$_pp2Database.create(Object.assign(mobil, { image: e.url }));
				this.$_pp2Upload.$upload$.unsubscribe()
			})
			let image = this.$_pp2Upload.pushUpload();
		} else if ( this.type == 'ubah' && !this.C_Pp2_Dry_FI.fileExist ) {
			const {$key} = mobil;
			delete mobil.$key;
			this.$_pp2Database.update($key, mobil)
		}
	}
}
