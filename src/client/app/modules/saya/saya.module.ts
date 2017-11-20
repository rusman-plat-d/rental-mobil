import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { SayaRoutingModule, SayaComponents } from './saya.routing.module';

import { SayaChildrenGuard } from './guards/saya-children.guard';

export const SayaDirectives = [
];

export const SayaServices = [
	SayaChildrenGuard
];

@NgModule({
	imports: [
		DryModule,
		SayaRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...SayaComponents,
		...SayaDirectives
	],
	providers: [
		...SayaServices
	],
})
export class SayaModule { }
