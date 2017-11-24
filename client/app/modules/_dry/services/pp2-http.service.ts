import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Pp2HttpService {
	data = new FormData();
	constructor(
		private $ng_HttpClient: HttpClient
	) { }
	kirimText(data: any) {
		return this.$ng_HttpClient.post('', {})
	}
}
