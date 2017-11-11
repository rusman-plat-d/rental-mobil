import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { DryModule } from './modules/_dry/dry.module';

import { Pp2RoutingModule, Pp2Components } from './pp2.routing.module';

import { Pp2SuModule } from './modules/su/su.module';
import { Pp2SayaModule } from './modules/saya/saya.module';

import { Pp2Component } from './pp2.component';
import { NavComponent_ } from './components/_nav/_nav.component';

import { SayaGuard } from './guards/saya.guard';

export const Pp2Guards = [
	SayaGuard
];

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		// TransferHttpCacheModule,
		Pp2SuModule,
		Pp2SayaModule,
		Pp2RoutingModule
	],
	declarations: [
		Pp2Component,
		NavComponent_,
		...Pp2Components
	],
	providers:[
		...Pp2Guards
	],
	bootstrap: [Pp2Component]
})
export class Pp2Module { }
