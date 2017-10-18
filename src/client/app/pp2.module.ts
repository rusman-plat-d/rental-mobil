import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DryModule } from './modules/_dry/dry.module';

import { Pp2RoutingModule } from './pp2.routing.module';

import { Pp2SuModule } from './modules/su/su.module';

import { Pp2Component } from './pp2.component';
import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';

export const Pp2Components = [
	Pp2Component,
	HomeComponent,
	DevComponent
];

@NgModule({
	declarations: [
		...Pp2Components
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		Pp2RoutingModule,
		Pp2SuModule
	],
	bootstrap: [Pp2Component]
})
export class Pp2Module { }
