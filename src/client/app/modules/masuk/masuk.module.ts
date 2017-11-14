import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';

import { Pp2MasukRoutingModule, Pp2MasukComponents } from './masuk.routing.module';

export const Pp2MasukDirectives = [
];

export const Pp2MasukServices = [
];

@NgModule({
	imports: [
		DryModule,
		Pp2MasukRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...Pp2MasukComponents,
		...Pp2MasukDirectives
	],
	providers: [
		...Pp2MasukServices
	],
})
export class Pp2MasukModule { }
