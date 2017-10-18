import { NgModule } from '@angular/core';

import { RequireModule } from './require.module';

import { _ContainerComponent } from './components/_container/_container.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';

import { Pp2MediaQueryService } from './services/Pp2-media-query.service';

export const DryComponents = [
	_ContainerComponent,
	_NavComponent,
	_SidenavComponent
];

export const DryServices = [
	Pp2MediaQueryService
];

@NgModule({
	imports: [
		...RequireModule
	],
	exports: [
		...RequireModule,
		...DryComponents
	],
	declarations: [
		...DryComponents
	],
	providers: DryServices,
})
export class DryModule { }
