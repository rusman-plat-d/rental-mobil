import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

declare var document: any,
	SocketIOFileUpload: any;

@Component({
	selector: 'pp2-dry-fileImage',
	templateUrl: '_file-image.component.html',
	styleUrls: ['_file-image.component.scss']
})

export class _FileImageComponent implements OnDestroy, OnInit {
	@ViewChild('preview') img;
	imageSrc: string = '';
	fileExist: boolean = false;
	i_file: HTMLInputElement;
	SIOFU: any;
	get label() {
		return this.fileExist ? 'Ganti' : 'Upload';
	}
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ngRenderer2: Renderer2,
		private $_ngRouter: Router,
		private $_matSnackBar: MatSnackBar
	) { }
	ngOnDestroy() {
		this.SIOFU = null;
	}
	ngOnInit() {
		const img = this.img.nativeElement;
		this.i_file = this.$_ngRenderer2.createElement('input');
		this.i_file.type = 'file';
		this.i_file.onchange = () => {
			if (this.i_file.files.length > 0) {
				let fileToLoad = this.i_file.files[0]
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
	}
	chooseFile() {
		this.i_file.dispatchEvent(new MouseEvent('click'))
	}
	save(url: string, data, type: 'tambah' | 'ubah', navigateTo?: string[]) {
		const formData = new FormData();
		formData.append('data', JSON.stringify(data))
		if (this.i_file.files.length >= 1) { formData.append('photo', this.i_file.files[0]) }
		if (type === 'tambah')
			this.$_ngHttpClient.post(url, formData)
				.subscribe((res) => {
					console.log(res)
				})
		else
			this.$_ngHttpClient.put(url, formData)
				.subscribe((res) => {
					console.log(res)
				})
		if (navigateTo)
			this.$_ngRouter.navigate(navigateTo);
		this.$_matSnackBar.open('Data Berhasil ' + (type == 'tambah' ? 'Ditambahkan' : 'Perbarui'))
		setTimeout(() => {
			this.$_matSnackBar.dismiss();
		}, 4000)
	}
}
