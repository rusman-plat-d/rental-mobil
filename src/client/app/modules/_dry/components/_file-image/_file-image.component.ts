import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var document: any;

@Component({
	selector: 'pp2-dry-fileImage',
	templateUrl: '_file-image.component.html',
	styles: [`
		.img-view{
			background-color: yellowgreen;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.img-view img{
			max-width: 100%;
			max-height: 100%;
		}
		.img-view button{
			background-color: transparent;
			font-size: 20px;
			width: 100%;
		}
	`]
})

export class _FileImageComponent implements OnInit {
	@Input() size: { height: string, width: string } = { height: '200px', width: '250px' };
	@ViewChild('preview') img;
	fileExist: boolean = false;
	get label() {
		return this.fileExist ? 'Ganti' : 'Upload';
	}
	constructor() { }

	ngOnInit() { }
	chooseFile() {
		const i_file: HTMLInputElement = document.createElement('input');
		const img = this.img.nativeElement;
		i_file.type = 'file';
		i_file.onchange = () => {
			let fileSelected = i_file.files
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
		i_file.dispatchEvent(new MouseEvent('click'))
	}
}
