import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { Pp2SuRoutingModule } from './su.routing.module';


import { Pp2SuComponent } from './su.component';
import { Pp2SuFormSupirComponent } from './components/_form-supir/_form-supir.component';


export const Pp2SuComponents = [
	Pp2SuComponent,
	Pp2SuFormSupirComponent
];

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
