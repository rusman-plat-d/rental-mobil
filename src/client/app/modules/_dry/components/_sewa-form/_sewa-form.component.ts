import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DateAdapter, NativeDateAdapter } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Mobil } from '../../interfaces/mobil.interface';
import { Supir } from '../../interfaces/supir.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2Service } from '../../services/pp2.service';

@Component({
	selector: 'pp2-dry-sewaForm',
	templateUrl: '_sewa-form.component.html'
})
export class _SewaFormComponent implements AfterViewInit, OnInit {
	minDate = new Date();
	Mobil$: Mobil[] = [];
	Mobil: Mobil;
	Supir$: Supir[] = [];
	Supir: Supir;
	private id_mobil: string;
	private id_supir: string;
	_mobilDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	_supirDatabase: DatabaseService = new DatabaseService(this.$_pp2Conf);
	sewaForm: FormGroup;
	constructor(
		public $_pp2Conf: ConfigService,
		public $_pp2: Pp2Service,
		public $_ngFormBuilder: FormBuilder,
		public $_matDateAdapter: DateAdapter<Date>
	){
		$_matDateAdapter.setLocale('id-ID');
		this._mobilDatabase.init<Mobil>('/db/mobil')
		this._supirDatabase.init<Supir>('/db/supir')
		this.sewaForm = $_ngFormBuilder.group({
			mobil: [''],
			supir: [''],
			tgl_mulai: [''],
			tgl_selesai: [''],
		})
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
		}, 10)
		this.sewaForm.valueChanges.subscribe((val) => {
			console.log(val.tgl_mulai.valueOf())
			// this.sewaForm.setValue({
			// 	tgl_mulai: val.tgl_mulai.substr(0, 10)
			// })
			alert(val.tgl_mulai.valueOf())
		})
	}
}
