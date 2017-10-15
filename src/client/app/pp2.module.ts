import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { RequireModule } from './require.module';

import { Pp2Component } from './pp2.component';

@NgModule({
	declarations: [
		Pp2Component
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),

		MaterialModule,
		...RequireModule
	],
	providers: [],
	bootstrap: [Pp2Component]
})
export class Pp2Module { }
