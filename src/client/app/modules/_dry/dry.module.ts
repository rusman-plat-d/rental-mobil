import { NgModule } from '@angular/core';

import { RequireModule } from './require.module';

import { _ContainerComponent } from './components/_container/_container.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';
import { _FileImageComponent } from './components/_file-image/_file-image.component';


import { GridDirective } from './directives/grid.directive';
import { Pp2MediaQueryService } from './services/Pp2-media-query.service';

export const DryComponents = [
	_ContainerComponent,
	_NavComponent,
	_SidenavComponent,
	_FileImageComponent
];
export const DryDirectives = [
	GridDirective
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
		...DryComponents,
		...DryDirectives
	],
	providers: DryServices,
})
export class DryModule { }
