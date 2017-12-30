import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter, MatCheckbox, MatDatepicker, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Mobil$Key } from '../../interfaces/mobil.interface';
import { Supir$Key } from '../../interfaces/supir.interface';
import { Sewa$Key } from '../../interfaces/sewa.interface';
import { Pengguna, Pengguna$Key } from '../../interfaces/pengguna.interface';

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

	$keyMobil: string;
	$keySupir: string;
	tglMulai;
	tglSelesai;

	minDate = new Date();
	get Mobil$() : Mobil$Key[] { return this.$_pp2MobilDatabase.data };
	get Supir$() : Supir$Key[] { return this.$_pp2SupirDatabase.data };
	_sewa: Sewa$Key = {};
	$_pp2MobilDatabase: DatabaseService<Mobil$Key> = new DatabaseService<Mobil$Key>(this.$_ngfDatabase);
	$_pp2SupirDatabase: DatabaseService<Supir$Key> = new DatabaseService<Supir$Key>(this.$_ngfDatabase);
	$_pp2SewaDatabase: DatabaseService<Sewa$Key> = new DatabaseService<Sewa$Key>(this.$_ngfDatabase);
	sewaForm_mobil: FormGroup;
	sewaForm_supir: FormGroup;
	sewaForm_saya: FormGroup;
	sewaForm_sewa: FormGroup;
	Saya: Pengguna$Key;

	get _m() { return `"m":"${this.$keyMobil || ''}"`; }
	get _s() { return this.$keySupir ? `,"s":"${this.$keySupir || ''}"` : ''; }

	get Mobil(): Mobil$Key {
		let mobil = {};
		try{ mobil=JSON.parse(this.sewaForm_mobil.value.mobil) }catch(e){mobil={}}
		return mobil;
	}
	get Supir(): Supir$Key {
		let supir = {};
		try{ supir=JSON.parse(this.sewaForm_mobil.value.supir) }catch(e){supir={}}
		return supir;
	}
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

		this.$_pp2MobilDatabase.table = 'mobil';
		this.$_pp2SupirDatabase.table = 'supir';
		this.$_pp2SewaDatabase.table = 'sewa';

		if (this.$_ngActivatedRoute.snapshot.params['id'] != undefined) {
			const id = JSON.parse(this.$_ngActivatedRoute.snapshot.params['id'].replace('(', '{').replace(')', '}'))
			try {
				this.$keyMobil = id['m'] ? id['m'] : '';
				this.$keySupir = id['s'] ? id['s'] : '';
				this.tglMulai = id['tm'] ? id['tm'] : '';
				this.tglSelesai = id['ts'] ? id['ts'] : '';
			} catch (e) { alert('e: id') }
		}
		try {
			this.Saya = JSON.parse(localStorage.ggPengguna);
			this._sewa.id_pengguna = this.Saya.$key;
		} catch (e) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000);
			this.$_ngRouter.navigate(['masuk'])
		}
		$_matDateAdapter.setLocale('id-ID');
		this.init();
	}
	ngAfterViewInit() {
		if (this.$keySupir) {
			setTimeout(() => {
				this._butuhSupir.checked = true;
			}, 1000)
		}
	}
	ngOnInit(){}
	init() {
		this.sewaForm_mobil = this.$_ngFormBuilder.group({
			mobil: ['', Validators.required]
		});
		this.sewaForm_mobil.get('mobil').valueChanges.subscribe((mobil: string) => {
			if (typeof mobil == 'string') {
				const _mobil = `"m":"${JSON.parse(mobil).$key || this.$keyMobil}"`;
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `(${_mobil + this._s})`])
				}
			}
		})
		if( this.$keyMobil ) {
			this.$_pp2MobilDatabase.$data$.subscribe(($Mobil: Mobil$Key[]) => {
				let Mobil = $Mobil.filter((Mobil: Mobil$Key) => {
					this.$_pp2MobilDatabase.$data$.unsubscribe();
					return Mobil.$key == this.$keyMobil
				})
				this.sewaForm_mobil.get('mobil').setValue(JSON.stringify(Mobil[0]))
			})
		}
		// -----------------------------------------------------------------
		this.sewaForm_supir = this.$_ngFormBuilder.group({
			supir: [{ value: '' }]
		});
		this.sewaForm_supir.get('supir').valueChanges.subscribe((supir: string) => {
			setTimeout(() => {
				let id;
				try { id = JSON.parse(supir).$key; }
				catch (e) { id = this.$keySupir; }
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${this.Mobil.$key}"${this._s})`])
				}
			}, 10)
		});
		if( this.$keySupir ) {
			this.$_pp2SupirDatabase.$data$.subscribe(($Supir: Supir$Key[]) => {
				let Supir = $Supir.filter((Supir: Supir$Key) => {
					this.$_pp2SupirDatabase.$data$.unsubscribe();
					return Supir.$key == this.$keySupir
				})
				this.sewaForm_supir.get('Supir').setValue(JSON.stringify(Supir[0]))
			})
		}
		// -----------------------------------------------------------------
		this.sewaForm_saya = this.$_ngFormBuilder.group({
			gg: [''],
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
			id_mobil: this.Mobil.$key,
			id_pengguna: this.Saya.$key,
			id_supir: '',
			tglMulai: this.tgl_mulai,
			tglSelesai: this.tgl_selesai,
			totalSewaHari: this.total_hari_sewa
		};
		if (this._butuhSupir.checked) { this._sewa.id_supir = this.Supir.$key }
		console.log(this._sewa)
		this.$_pp2SewaDatabase.create(this._sewa)
		this.$_matSnackBar.open('Berhasil Menyewa Mobil')

		setTimeout(() => {
			this.$_matSnackBar.dismiss()
		}, 4000)
	}
	log(e) {
		console.log(e)
	}
}
