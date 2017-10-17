import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatModules, CdkModules } from './material.module';
import { RequireModule } from './require.module';

import { Pp2RoutingModule } from './pp2.routing.module';

import { Pp2Component } from './pp2.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _ContainerComponent } from './components/_container/_container.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';

@NgModule({
	declarations: [
		Pp2Component,
		_NavComponent,
		_ContainerComponent,
		_SidenavComponent,
		HomeComponent,
		DevComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		Pp2RoutingModule,

		...MatModules,
		...CdkModules,
		...RequireModule
	],
	providers: [],
	bootstrap: [Pp2Component]
})
export class Pp2Module { }
