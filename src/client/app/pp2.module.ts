import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

// import { TransferHttpCacheModule } from '@nguniversal/common';

import { DryModule } from './modules/_dry/dry.module';

import { Pp2RoutingModule, Pp2Components } from './pp2.routing.module';

import { PengurusModule } from './modules/pengurus/pengurus.module';
import { SayaModule } from './modules/saya/saya.module';

import { Pp2Component } from './pp2.component';
import { NavComponent_ } from './components/_nav/_nav.component';


export const Pp2Guards = [
];

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		// TransferHttpCacheModule,
		PengurusModule,
		SayaModule,
		Pp2RoutingModule,
		// ServiceWorkerModule.register('/ngsw-worker.js')
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
