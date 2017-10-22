import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';

import { Mobil } from '../../interfaces/mobil.interface';

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
	disable: boolean = false;
	label: string;
	mobilForm: FormGroup;
	sembunyikan = false;
	type: string;
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Tambah Mobil' : 'Ubah Data Mobil';
	}
	ngAfterViewInit() { }
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
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
		this.C_Pp2_Dry_FI.img.nativeElement.src = this.$_pp2Conf.baseUrl + '/uploads/mobil/placeholder.png';
		if ( id ) {
			this.$_ngHttpClient.get<Mobil>(this.$_pp2Conf.baseUrl + '/api/db/file/mobil/get/' + id)
				.subscribe((mobil: Mobil) => {
					this.mobilForm.setValue({
						id: mobil.id,
						nama: mobil.nama,
						platNo: mobil.platNo,
						kursi: mobil.kursi,
						bensin: mobil.bensin,
						hargaSewa: mobil.hargaSewa,
						image: mobil.image,
						kondisi: mobil.kondisi,
						_status: mobil._status,
						_disewa: mobil._disewa,
						_disewaSampai: mobil._disewaSampai,
						createdAt: mobil.createdAt,
						updatedAt: mobil.updatedAt
					})
					this.C_Pp2_Dry_FI.img.nativeElement.src = this.$_pp2Conf.baseUrl + '/uploads/mobil/' + mobil.image;
				})
		}
		this.disableForm();
		this.mobilForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(): void {
		if (this.$_ngActivatedRoute.data['value']['type'] === 'ubah') {
			this.disable = false || !this.mobilForm['valid'];
		}
		if ((this.$_ngActivatedRoute.data['value']['type'] === 'tambah')) {
			try {
				if (this.C_Pp2_Dry_FI.i_file.files) {
					this.disable = false || !this.mobilForm.valid;
				}
			} catch (e) {
				this.disable = true;
			}
		} else { this.disable = false || !this.mobilForm['valid'] }
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, val): void {
		e.preventDefault();
		const url = this.$_pp2Conf.baseUrl + '/api/db/file/mobil/' + (this.$_ngActivatedRoute.data['value']['type'] === 'tambah' ? 'post' : 'put');
		this.C_Pp2_Dry_FI.save(url, val, this.$_ngActivatedRoute.data['value']['type'], ['pengurus', 'mobil', 'lihat'])
	}
}
