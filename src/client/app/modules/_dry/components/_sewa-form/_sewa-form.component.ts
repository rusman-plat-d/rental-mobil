import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter, MatCheckbox, MatDatepicker, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Mobil, MobilId } from '../../interfaces/mobil.interface';
import { Supir, SupirId } from '../../interfaces/supir.interface';
import { Sewa, SewaId } from '../../interfaces/sewa.interface';
import { Pengguna, PenggunaId } from '../../interfaces/pengguna.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';
import { Pp2Service } from '../../services/pp2.service';

@Component({
	selector: 'pp2-dry-sewaForm',
	templateUrl: '_sewa-form.component.html',
	styles: [`
		.pp2-dry-sewaForm-container{
			 height: 100%;
			 width: 100%;
		}
		.padd-15px {
			padding: 15px 0;
		}
	`]
})
export class _SewaFormComponent implements AfterViewInit, OnInit {
	@ViewChild('butuhSupir') _butuhSupir: MatCheckbox;
	@ViewChild('mulai') __mulai: MatDatepicker<Date>;
	@ViewChild('selesai') __selesai: MatDatepicker<Date>;

	private tgl_mulai_val;

	idMobil: string;
	idSupir: string;
	tglMulai;
	tglSelesai;

	minDate = new Date();
	Mobil$: MobilId[] = [];
	Supir$: SupirId[] = [];
	_sewa: SewaId = {};
	$_pp2MobilDatabase: DatabaseService<MobilId>;
	$_pp2SupirDatabase: DatabaseService<SupirId>;
	sewaForm_mobil: FormGroup;
	sewaForm_supir: FormGroup;
	sewaForm_saya: FormGroup;
	sewaForm_sewa: FormGroup;
	Saya: PenggunaId;

	get _m() { return `"m":"${this.idMobil || ''}"`; }
	get _s() { return `,"s":"${this.idSupir || ''}"`; }

	get Mobil(): MobilId { return this.$_pp2.parse(this.sewaForm_mobil.value.mobil); }
	get Supir(): SupirId { return this.$_pp2.parse(this.sewaForm_supir.value.supir); }
	get tgl_mulai() { return this.sewaForm_sewa.value.tgl_mulai.valueOf(); }
	get tgl_selesai() { return this.sewaForm_sewa.value.tgl_selesai.valueOf(); }
	get tgl_selesai_minDate() { return new Date(this.tgl_mulai + 86400000) }
	get total_hari_sewa(): number {
		const HARI = (this.tgl_selesai - this.tgl_mulai) / 86400000;
		return (HARI < 0 ? 0 : HARI);
	}
	constructor(
		public $_matDateAdapter: DateAdapter<Date>,
		public $_pp2Conf: ConfigService,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ngfDatabase: AngularFireDatabase,
		private $_pp2: Pp2Service,
		private $_pp2MQ: Pp2MediaQueryService,
		private $_matSnackBar: MatSnackBar
	) {
		// $_matDialog.afterOpen.subscribe(() => {if (!doc.body.classList.contains('no-scroll')) {doc.body.classList.add('no-scroll');}});
		// $_matDialog.afterAllClosed.subscribe(() => {doc.body.classList.remove('no-scroll');});
		this.$_pp2MobilDatabase = new DatabaseService<MobilId>($_ngfDatabase);
		this.$_pp2SupirDatabase = new DatabaseService<SupirId>($_ngfDatabase);

		this.$_pp2MobilDatabase.table = 'mobil';
		this.$_pp2SupirDatabase.table = 'supir';

		if (this.$_ngActivatedRoute.snapshot.params['id'] != undefined) {
			const id = JSON.parse(this.$_ngActivatedRoute.snapshot.params['id'].replace('(', '{').replace(')', '}'))
			try {
				this.idMobil = id['m'] ? id['m'] : '';
				this.idSupir = id['s'] ? id['s'] : '';
				this.tglMulai = id['tm'] ? id['tm'] : '';
				this.tglSelesai = id['ts'] ? id['ts'] : '';
			} catch (e) { alert('e: id') }
		}
		try {
			this.Saya = JSON.parse(localStorage.ggPengguna);
			this._sewa.id_pengguna = this.Saya.id;
		} catch (e) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000);
			this.$_ngRouter.navigate(['masuk'])
		}
		$_matDateAdapter.setLocale('id-ID');
	}
	ngAfterViewInit() {
		if (this.idSupir) {
			setTimeout(() => {
				this._butuhSupir.checked = true;
			}, 1000)
		}
	}
	ngOnInit() {
		this.sewaForm_mobil = this.$_ngFormBuilder.group({
			mobil: ['', Validators.required]
		});
		this.sewaForm_mobil.get('mobil').valueChanges.subscribe((mobil: string) => {
			if (typeof mobil == 'string') {
				const _mobil = `"m":"${JSON.parse(mobil).id || this.idMobil}"`;
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `(${_mobil + this._s})`])
				}
			}
		})
		this.sewaForm_supir = this.$_ngFormBuilder.group({
			supir: [{ value: '' }]
		});
		this.sewaForm_supir.get('supir').valueChanges.subscribe((supir: string) => {
			setTimeout(() => {
				let id;
				try {
					id = JSON.parse(supir).id;
				} catch (e) {
					id = this.idSupir;
				}
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${this.Mobil.id}"${this._s})`])
				}
			}, 10)
		});

		this.sewaForm_saya = this.$_ngFormBuilder.group({
			gg: ['']
		});
		this.sewaForm_sewa = this.$_ngFormBuilder.group({
			tgl_mulai: ['', Validators.required],
			tgl_selesai: ['', Validators.required]
		});
	}
	tgl_keypress(e: Event) {
		e.preventDefault();
	}
	pp2SewaSubmit() {
		this._sewa = {
			id_mobil: this.Mobil.id,
			id_pengguna: this.Saya.id,
			tglMulai: this.tgl_mulai,
			tglSelesai: this.tgl_selesai,
			totalSewaHari: this.total_hari_sewa
		};
		if (this._butuhSupir.checked) { this._sewa.id_supir = this.Supir.id }
		this.$_ngHttpClient.post(this.$_pp2Conf.baseUrl + '/api/db/file/sewa/post', {data: JSON.stringify(this._sewa)})
			.subscribe(
				(a)=>{console.log(a)},
				(a)=>{console.log(a)},
				()=>{console.log()}
			)
		this.$_matSnackBar.open('Berhasil Menyewa Mobil')
		this.$_ngRouter.navigate(['saya'])
		setTimeout(() => {
			this.$_matSnackBar.dismiss()
		}, 4000)
	}
	log(e) {
		console.log(e)
	}
}
