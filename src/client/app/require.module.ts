import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";

export const RequireModule = [
	BrowserAnimationsModule,
	FlexLayoutModule,
	FormsModule,
	NoopAnimationsModule,
	ReactiveFormsModule,
	RouterModule
];
