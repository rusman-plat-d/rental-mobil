import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

import { RequireModule } from './require.module';

import { _ContainerComponent } from './components/_container/_container.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';
import { _FileImageComponent } from './components/_file-image/_file-image.component';
import { _SupirFormComponent } from './components/_supir-form/_supir-form.component';
import { _SupirViewTableComponent } from './components/_supir-view-table/_supir-view-table.component';
import { _MobilFormComponent } from './components/_mobil-form/_mobil-form.component';
import { _MobilViewTableComponent } from './components/_mobil-view-table/_mobil-view-table.component';
import { _UserFormComponent } from './components/_user-form/_user-form.component';
import { _UserViewComponent } from './components/_user-view-table/_user-view-table.component';
import { _MobilViewGridComponent } from './components/_mobil-view-grid/_mobil-view-grid.component';
import { _SewaFormComponent } from './components/_sewa-form/_sewa-form.component';

import { GridDirective } from './directives/grid.directive';

import { Pp2MediaQueryService } from './services/Pp2-media-query.service';
import { DatabaseService } from './services/database.service';
import { ConfigService } from './services/config.service';
import { Pp2Service } from './services/pp2.service';

export const DryComponents = [
	_ContainerComponent,
	_NavComponent,
	_SidenavComponent,
	_FileImageComponent,
	_SupirFormComponent,
	_SupirViewTableComponent,
	_MobilFormComponent,
	_MobilViewTableComponent,
	_UserFormComponent,
	_UserViewComponent,
	_MobilViewGridComponent,
	_SewaFormComponent
];
export const DryDirectives = [
	GridDirective
];

export const DryServices = [
	Pp2MediaQueryService,
	DatabaseService,
	ConfigService,
	Pp2Service
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
	providers: [
		...DryServices,
	]

})
export class DryModule { }
