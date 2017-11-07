import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { Pp2SuRoutingModule, Pp2SuComponents } from './su.routing.module';

export const Pp2SuDirectives = [

];

export const Pp2SuServices = [

];

@NgModule({
	imports: [
		DryModule,
		Pp2SuRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...Pp2SuComponents,
		...Pp2SuDirectives
	],
	providers: [
		...Pp2SuServices
	],
})
export class Pp2SuModule { }
