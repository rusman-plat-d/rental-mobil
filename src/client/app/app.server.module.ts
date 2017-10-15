import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		AppModule,
		ServerModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppServerModule { }
