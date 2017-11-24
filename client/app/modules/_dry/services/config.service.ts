import { Injectable, isDevMode } from '@angular/core';

declare var window: Window;

@Injectable()
export class ConfigService {
	get baseUrl() {
		// return window.location.hostname === 'localhost' ? 'http://localhost:4136' : 'https://pp2-rental.herokuapp.com';
		return 'http://localhost:4136';
	}
	constructor() { }
}
