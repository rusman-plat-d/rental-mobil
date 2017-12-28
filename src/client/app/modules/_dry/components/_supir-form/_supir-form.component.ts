import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

import { Supir, SupirId } from '../../interfaces/supir.interface';

@Component({
	selector: "pp2-dry-supirForm",
	templateUrl: "_supir-form.component.html",
	styles: [``]
})
export class _SupirFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;

	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	get disable() { return false || !this.supirForm.valid; }
	label: string;
	sembunyikan = false;
	supirForm: FormGroup;
	type: 'tambah' | 'ubah';
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngRouter: Router,
		private $_pp2Config: ConfigService,
		private $_pp2Database: DatabaseService<SupirId>,
		public $_pp2Upload: UploadService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Tambah Supir' : 'Ubah Data Supir';
	}
	ngAfterViewInit() { }
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.supirForm = this.$_ngFormBuilder.group(this.supirFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/assets/img/placeholder-supir.png';
		if ( id ) {
			this.$_ngHttpClient.get<Supir>(this.$_pp2Config.baseUrl + '/api/db/file/supir/get/' + id)
				.subscribe((supir: SupirId) => {
					this.supirForm.setValue(this.supirFormObject())
					this.C_Pp2_Dry_FI.img.nativeElement.src = supir.image;
				})
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, supir: SupirId): void {
		e.preventDefault();
		// if ( this.type === 'tambah' || (this.type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) )
			// supir.image = this.$_pp2Upload.uploadSingle().url;
		this.$_pp2Database.create(supir);
	}
	supirFormObject(supir: SupirId = {}){
		return {
			id: supir.id || [''],
			nama: supir.nama || [''],
			noSIM: supir.noSIM || [''],
			jk: supir.jk || [''],
			noHP: supir.noHP || [''],
			hargaSewa: supir.hargaSewa || [''],
			alamat: supir.alamat || [''],
			email: supir.email || [''],
			image: supir.image || [''],
			_status: supir._status || [''],
			_disewa: supir._disewa || [''],
			_disewaSampai: supir._disewaSampai || [''],
			createdAt: supir.createdAt || [''],
			updatedAt: supir.updatedAt || ['']
		}
	}
}
