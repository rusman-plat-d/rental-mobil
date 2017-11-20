import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter, MatCheckbox, MatSelect, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';

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
	@ViewChild('C_Mat_Select_Mobil') C_Mat_Select_Mobil: MatSelect;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	$Socket: Server;

	private tgl_mulai_val;
	private id_mobil: string;
	private id_supir: string;

	idMobil: string;
	idSupir: string;
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
		this.$Socket = io($_pp2Conf.socket + '/db/sewa');
		if ( this.$_ngActivatedRoute.snapshot.params['id'] != undefined ) {
			const id = JSON.parse(this.$_ngActivatedRoute.snapshot.params['id'].replace('(', '{').replace(')', '}'))
			try{
				this.idMobil = id['m'] ? id['m'] : '';
				this.idSupir = id['s'] ? id['s'] : '';
			}catch(e){alert('e: id')}
		}
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
	}
	ngAfterViewInit() {}
	ngOnInit(){
		this.sewaForm_mobil = this.$_ngFormBuilder.group({
			mobil: ['', Validators.required]
		});
		this.sewaForm_mobil.get('mobil').valueChanges.subscribe((mobil: string)=>{
			if ( typeof mobil == 'string') {
				this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${JSON.parse(mobil).id || this.idMobil}")`])
			}
		})
		this.sewaForm_supir = this.$_ngFormBuilder.group({
			supir: ['']
		});
		this.sewaForm_supir.get('supir').valueChanges.subscribe((supir: string) => {
			setTimeout(()=>{
				this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${this.Mobil.id || this.idMobil}","s":"${JSON.parse(supir).id || this.idSupir}")`])
			},10)
		});

		this.sewaForm_saya = this.$_ngFormBuilder.group({
			gg: ['']
		});
		this.sewaForm_sewa = this.$_ngFormBuilder.group({
			tgl_mulai: ['', Validators.required],
			tgl_selesai: ['', Validators.required]
		});
		setTimeout(() => {
			this._mobilDatabase.dataChange.subscribe((Mobil$: Mobil[]) => {
				this.Mobil$ = Mobil$;
				this.sewaForm_mobil.get('mobil').setValue(JSON.stringify(
					this.Mobil$.filter((mobil: Mobil) => {
						return mobil.id == this.idMobil
					})[0]
				))
			})
			this._supirDatabase.dataChange.subscribe((supir: Supir[]) => {
				this.Supir$ = supir;
				if ( this.idSupir ) {
					this.sewaForm_supir.get('supir').setValue(JSON.stringify(
						this.Supir$.filter((supir: Supir) => {
							return supir.id == this.idSupir
						})[0]
					))
				}
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
