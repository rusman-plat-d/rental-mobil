import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class ConfigService {	
	get socket(){
		return isDevMode() ? 'http://localhost:4136' : 'https://pp2-rental.herokuapp.com';
	}
	constructor() {
		
	}
}
