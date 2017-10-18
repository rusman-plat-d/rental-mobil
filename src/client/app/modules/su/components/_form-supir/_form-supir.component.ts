import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'pp2-su-form-supir',
	templateUrl: '_form-supir.component.html'
})

export class Pp2SuFormSupirComponent implements OnInit {
	ggForm: FormGroup;
	constructor(
		public $_Mat_FBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.ggForm = this.$_Mat_FBuilder.group({
			namas: [''],
			noHp: [''],
			alamat: [''],
			email: ['']
		});
	}
}
