import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { DryModule } from './modules/_dry/dry.module';

import { Pp2RoutingModule, Pp2Components } from './pp2.routing.module';

import { Pp2SuModule } from './modules/su/su.module';

import { Pp2Component } from './pp2.component';


@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		// TransferHttpCacheModule,
		Pp2SuModule,
		Pp2RoutingModule
	],
	declarations: [
		Pp2Component,
		...Pp2Components
	],
	bootstrap: [Pp2Component]
})
export class Pp2Module { }
