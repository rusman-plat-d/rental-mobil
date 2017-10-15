import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Pp2Module } from './pp2.module';
import { Pp2Component } from './pp2.component';

@NgModule({
	imports: [
		Pp2Module,
		ServerModule,
	],
	providers: [],
	bootstrap: [Pp2Component]
})
export class Pp2ServerModule { }
