import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter, MatCheckbox, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Mobil } from '../../interfaces/mobil.interface';
import { Supir } from '../../interfaces/supir.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';
import { Sewa } from '../../interfaces/sewa.interface';
import { User } from '../../interfaces/user.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';
import { Pp2Service } from '../../services/pp2.service';

declare var io: any;

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
	$Socket: Server;

	private tgl_mulai_val;
	private id_mobil: string;
	private id_supir: string;

	minDate = new Date();
	Mobil$: Mobil[] = [];
	Supir$: Supir[] = [];
	_sewa: Sewa = {};
	_mobilDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_supirDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	sewaForm_mobil: FormGroup;
	sewaForm_supir: FormGroup;
	sewaForm_saya: FormGroup;
	sewaForm_sewa: FormGroup;
	Saya: User;
	get Mobil(): Mobil{
		return this.$_pp2.parse(this.sewaForm_mobil.value.mobil);
	}
	get Supir(): Supir {
		return this.$_pp2.parse(this.sewaForm_supir.value.supir);
	}
	get tgl_mulai() {
		return this.sewaForm_sewa.value.tgl_mulai.valueOf();
	}
	get tgl_selesai() {
		return this.sewaForm_sewa.value.tgl_selesai.valueOf();
	}
	get tgl_selesai_minDate(){
		return new Date(this.tgl_mulai + 86400000)
	}
	get total_hari_sewa(): number {
		const HARI = (this.tgl_selesai - this.tgl_mulai) / 86400000;
		return ( HARI < 0 ? 0 : HARI );
	}
	constructor(
		public $_matDateAdapter: DateAdapter<Date>,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngFormBuilder: FormBuilder,
		public $_ngRouter: Router,
		public $_pp2: Pp2Service,
		public $_pp2Conf: ConfigService,
		public $_pp2MQ: Pp2MediaQueryService,
		private $_matSnackBar: MatSnackBar
	){
		console.log($_ngActivatedRoute.snapshot.params['idMobil'])
		console.log($_ngActivatedRoute.snapshot.params['idMobil'] === '')
		this.$Socket = io($_pp2Conf.socket + '/db/sewa');
		try {
			this.Saya = JSON.parse(localStorage.ggPengguna);
			this._sewa.id_user = this.Saya.id;
		} catch (e) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000);
			this.$_ngRouter.navigate(['masuk'])
		}
		$_matDateAdapter.setLocale('id-ID');

		this._mobilDatabase.init<Mobil>('mobil', '/db/mobil')
		this._supirDatabase.init<Supir>('supir', '/db/supir')

		this.sewaForm_mobil = $_ngFormBuilder.group({
			mobil: ['', Validators.required]
		});
		this.sewaForm_mobil.valueChanges.subscribe((form) => {
			this._sewa.id_mobil = this.Mobil.id;
			this._sewa.totalSewaMobil = this.Mobil.hargaSewa * this.total_hari_sewa;
		})

		this.sewaForm_supir = $_ngFormBuilder.group({
			supir: ['']
		});
		this.sewaForm_supir.valueChanges.subscribe((form) => {
			this._sewa.id_supir = this.Supir.id;
			this._sewa.totalSewaSupir = this.Supir.hargaSewa * this.total_hari_sewa;
		})

		this.sewaForm_saya = $_ngFormBuilder.group({
			gg: ['']
		});

		this.sewaForm_sewa = $_ngFormBuilder.group({
			tgl_mulai: ['', Validators.required],
			tgl_selesai: ['', Validators.required]
		});
	}
	ngAfterViewInit(){}
	ngOnInit(){
		setTimeout(() => {
			this._mobilDatabase.dataChange.subscribe((mobil: Mobil[]) => {
				this.Mobil$ = mobil;
			})
			this._supirDatabase.dataChange.subscribe((supir: Supir[]) => {
				this.Supir$ = supir;
			})
		}, 10);
	}
	tgl_keypress(e: Event){
		e.preventDefault();
	}
	pp2SewaSubmit(){
		this._sewa = {
			id_user: this.Saya.id,
			id_mobil: this.Mobil.id,
			tglMulai: this.tgl_mulai,
			tglSelesai: this.tgl_selesai,
			totalSewaHari: this.total_hari_sewa
		};
		if (this._butuhSupir.checked) {
			this._sewa.id_supir = this.Supir.id
		}
		console.log(this._sewa);
		this.$Socket.emit('add', this._sewa);
	}
}
