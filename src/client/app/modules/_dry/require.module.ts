import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";


import { CdkModules, MatModules } from './material.module';
export const RequireModule = [
	BrowserAnimationsModule,
	FlexLayoutModule,
	FormsModule,
	NoopAnimationsModule,
	ReactiveFormsModule,
	RouterModule,

	...CdkModules,
	...MatModules
];
