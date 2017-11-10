import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DateAdapter, NativeDateAdapter } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Mobil } from '../../interfaces/mobil.interface';
import { Supir } from '../../interfaces/supir.interface';

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
		.example-margin {
			margin: 0 10px;
		}
	`]
})
export class _SewaFormComponent implements AfterViewInit, OnInit {
	minDate = new Date();
	Mobil$: Mobil[] = [];
	Supir$: Supir[] = [];
	private tgl_mulai_val;
	private id_mobil: string;
	private id_supir: string;
	_mobilDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_supirDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	sewaForm_mobil: FormGroup;
	sewaForm_supir: FormGroup;
	sewaForm_saya: FormGroup;
	sewaForm_sewa: FormGroup;
	get Mobil(): Mobil {
		return this.$_pp2.parse(this.sewaForm_mobil.value.mobil)
	}
	get Supir(): Supir {
		return this.$_pp2.parse(this.sewaForm_supir.value.supir)
	}
	constructor(
		public $_pp2Conf: ConfigService,
		public $_pp2: Pp2Service,
		public $_ngFormBuilder: FormBuilder,
		public $_matDateAdapter: DateAdapter<Date>,
		public $_pp2MQ: Pp2MediaQueryService
	){
		$_matDateAdapter.setLocale('id-ID');
		this._mobilDatabase.init<Mobil>('/db/mobil')
		this._supirDatabase.init<Supir>('/db/supir')
		this.sewaForm_mobil = $_ngFormBuilder.group({
			mobil: ['']
		});
		this.sewaForm_supir = $_ngFormBuilder.group({
			supir: ['']
		});
		this.sewaForm_saya = $_ngFormBuilder.group({
			gg: ['']
		});
		this.sewaForm_sewa = $_ngFormBuilder.group({
			tgl_mulai: [''],
			tgl_selesai: ['']
		});
	}
	ngAfterViewInit(){
		console.log(this.$_matDateAdapter)
	}
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
}
