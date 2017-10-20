import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'pp2-su-form-supir',
	templateUrl: '_form-supir.component.html'
})

export class Pp2SuFormSupirComponent implements OnInit {
	ggForm: FormGroup;
	cities: string[] = [
		'Bandung',
		'Cirebon',
		'Jakarta',
		'Padang'
	];
	constructor(
		public $_Mat_FBuilder: FormBuilder,
		cRef: ViewContainerRef
	) {
		console.log(ViewContainerRef)
	}

	ngOnInit() {
		this.ggForm = this.$_Mat_FBuilder.group({
			noSIM: [''],
			nama: [''],
			jk: [''],
			noHp: [''],
			alamat: [''],
			email: ['']
		});
	}
}
