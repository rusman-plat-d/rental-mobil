import { NgModule } from '@angular/core';

import { RequireModule } from './require.module';

import { _ContainerComponent } from './components/_container/_container.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';
import { _FileImageComponent } from './components/_file-image/_file-image.component';
import { _SupirFormComponent } from './components/_supir-form/_supir-form.component';
import { _SupirViewComponent } from './components/_supir-view/_supir-view.component';

import { GridDirective } from './directives/grid.directive';

import { Pp2MediaQueryService } from './services/Pp2-media-query.service';
import { SupirDatabase } from './components/_supir-view/_supir-view.database';

export const DryComponents = [
	_ContainerComponent,
	_NavComponent,
	_SidenavComponent,
	_FileImageComponent,
	_SupirFormComponent,
	_SupirViewComponent
];
export const DryDirectives = [
	GridDirective
];
export const DryServices = [
	Pp2MediaQueryService,
	SupirDatabase
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
		...DryComponents,
		...DryDirectives
	],
	providers: DryServices,
})
export class DryModule { }
