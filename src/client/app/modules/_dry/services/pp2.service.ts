import { Injectable, isDevMode } from '@angular/core';

declare var window: Window;
declare var JSON: JSON;

@Injectable()
export class Pp2Service {
	constructor() {}
	parse(str){
		return JSON.parse(str)
	}
	stringify(obj){
		return JSON.stringify(obj)
	}
}
