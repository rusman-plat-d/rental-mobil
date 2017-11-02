import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CONFIG } from '../../consts/config.const';

declare var document: any,
			SocketIOFileUpload: any;

@Component({
	selector: 'pp2-dry-fileImage',
	templateUrl: '_file-image.component.html',
	styleUrls:['_file-image.component.scss']
})

export class _FileImageComponent implements OnDestroy, OnInit {
	@ViewChild('preview') img;
	CONFIG = CONFIG;
	imageSrc: string = '';
	fileExist: boolean = false;
	i_file: HTMLInputElement;
	SIOFU: any;
	get label() {
		return this.fileExist ? 'Ganti' : 'Upload';
	}
	constructor(
		private $_ngRouter: Router,
		private $_matSnackBar: MatSnackBar
	) { }
	ngOnDestroy() {
		this.SIOFU = null;
	}
	ngOnInit() { }
	chooseFile() {
		this.i_file = document.createElement('input');
		const img = this.img.nativeElement;
		this.i_file.type = 'file';
		this.i_file.onchange = () => {
			let fileSelected = this.i_file.files
			if (fileSelected.length > 0) {
				let fileToLoad = fileSelected[0]
				let fileReader = new FileReader()
				fileReader.onload = (fileLoadedEvent: any) => {
					img.src = fileLoadedEvent.target.result
				}
				fileReader.onloadend = () => {
					this.fileExist = true;
				}
				fileReader.readAsDataURL(fileToLoad);
			}
		}
		this.i_file.dispatchEvent(new MouseEvent('click'))
	}
	save($Socket, data, type, url?: string) {
		const btn: HTMLButtonElement = document.createElement('button');
		this.SIOFU = new SocketIOFileUpload($Socket);
		this.SIOFU.listenOnSubmit(btn, this.i_file);
		if ( type === 'tambah' ) {
			this.SIOFU.addEventListener('start', e => {
				e.file.meta.Supir = data;
				e.file.meta._type = 'tambah';
			});
		} else {
			this.SIOFU.addEventListener('start', e => {
				e.file.meta.Supir = data;
				e.file.meta._type = 'ubah';
			});
		}
		btn.dispatchEvent(new MouseEvent('click'));
		this.SIOFU.addEventListener('complete', e => {
			this.$_ngRouter.navigate(['su','supir','lihat']);
			this.$_matSnackBar.open('Data Berhasil Disimpan')
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000)
		})
	}
}
