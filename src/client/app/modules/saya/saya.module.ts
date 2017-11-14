import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { Pp2SayaRoutingModule, Pp2SayaComponents } from './saya.routing.module';

import { SayaChildrenGuard } from './guards/saya-children.guard';

export const Pp2SayaDirectives = [
];

export const Pp2SayaServices = [
	SayaChildrenGuard
];

@NgModule({
	imports: [
		DryModule,
		Pp2SayaRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...Pp2SayaComponents,
		...Pp2SayaDirectives
	],
	providers: [
		...Pp2SayaServices
	],
})
export class Pp2SayaModule { }
