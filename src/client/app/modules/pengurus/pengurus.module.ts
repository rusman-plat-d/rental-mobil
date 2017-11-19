import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { PengurusRoutingModule, PengurusComponents } from './pengurus.routing.module';

export const PengurusDirectives = [
];

export const PengurusServices = [
];

@NgModule({
	imports: [
		DryModule,
		PengurusRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...PengurusComponents,
		...PengurusDirectives
	],
	providers: [
		...PengurusServices
	],
})
export class PengurusModule { }
