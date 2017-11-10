import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { _ContainerComponent } from '../_container/_container.component';
import { _NavComponent } from '../_nav/_nav.component';
import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

import { Supir } from '../../interfaces/supir.interface';
import { Server } from '../../../_dry/interfaces/socket.interface';

import { CONFIG } from '../../../_dry/consts/config.const';

declare var io: any;

@Component({
	selector: "pp2-dry-supirForm",
	templateUrl: "_supir-form.component.html",
	styles: [``]
})
export class _SupirFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild(_NavComponent) C_Pp2_Dry_Nav: _NavComponent;

	disable: boolean = false;
	$Socket: Server;
	supirForm: FormGroup;
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	constructor(
		public $_ngFormBuilder: FormBuilder,
		public $_Pp2_MQ: Pp2MediaQueryService,
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.$Socket = io(this.$_pp2Conf.socket+'/db/supir');
	}
	ngAfterViewInit(){
		this.C_Pp2_Dry_Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnDestroy() {
		this.$Socket = null;
	}
	ngOnInit() {
		this.supirForm = this.$_ngFormBuilder.group({
			id: [''],
			nama: [''],
			noSIM: [''],
			jk: [''],
			noHP: [''],
			hargaSewa: [''],
			alamat: [''],
			email: [''],
			image: ['']
		});
		this.C_Pp2_Dry_FI.img.nativeElement.src = CONFIG.socket + '/uploads/supir/gg.png';
		if ( this.$_ngActivatedRoute.snapshot.params['id'] ) {
			this.$Socket.emit('get', this.$_ngActivatedRoute.snapshot.params['id'], (Supir: Supir) => {
				this.supirForm.setValue({
					id: Supir.id,
					nama: Supir.nama,
					noSIM: Supir.noSIM,
					jk: Supir.jk,
					noHP: Supir.noHP,
					hargaSewa: Supir.hargaSewa,
					alamat: Supir.alamat,
					email: Supir.email,
					image: Supir.image
				})
				this.C_Pp2_Dry_FI.img.nativeElement.src = CONFIG.socket + '/uploads/supir/' + Supir.image;
			})
		}
		this.disableForm();
		this.supirForm.valueChanges.subscribe(() => {
			this.disableForm();
		})
	}
	disableForm(): void {
		if ( this.$_ngActivatedRoute.data['value']['type'] === 'ubah' ) {
			this.disable = false || !this.supirForm.valid;
		}
		if ( (this.$_ngActivatedRoute.data['value']['type'] === 'tambah') ) {
			try{
				if ( this.C_Pp2_Dry_FI.i_file.files ) {
					this.disable = false || !this.supirForm.valid;
				}
			}catch(e){
				this.disable = true || !this.supirForm.valid;
			}
		}else{ this.disable = false || !this.supirForm.valid; }
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event,val): void {
		e.preventDefault();
		try{
			if ( this.C_Pp2_Dry_FI.i_file['files'] ) {
				if ( this.$_ngActivatedRoute.data['value']['type'] === 'tambah' ) {
					Object.assign(val, {
						id: ((Math.random() * Math.random() * 1000).toString()
								+Date.now()
								+(Math.random() * Math.random() * 1000).toString())
								.replace('.', '').replace('.', '').replace('.', '').replace('.', '')
					})
				}
				this.C_Pp2_Dry_FI.save(this.$Socket, val, this.$_ngActivatedRoute.data['value']['type'], ['su','supir','lihat'])
			}
		}catch(e){
			this.$Socket.emit('update', val);
			this.$_ngRouter.navigate(['su','supir','lihat'])
		}
	}
}
