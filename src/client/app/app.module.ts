import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { RequireModule } from './require.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),

		MaterialModule,
		...RequireModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
