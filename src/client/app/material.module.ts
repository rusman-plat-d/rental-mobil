import {
	MatDatepickerModule,
	MatMenuModule,
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSelectModule,
	MatSidenavModule,
	MatStepperModule,
	MatToolbarModule
} from '@angular/material';

export const MatModules: any[] = [
	MatDatepickerModule,
	MatMenuModule,
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSelectModule,
	MatSidenavModule,
	MatStepperModule,
	MatToolbarModule
];

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { CdkTableModule } from '@angular/cdk/table';
import { MatNativeDateModule, MatRippleModule } from '@angular/material';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';

export const CdkModules: any[] = [
	A11yModule,
	BidiModule,
	CdkTableModule,
	MatNativeDateModule, MatRippleModule,
	ObserversModule,
	PlatformModule,
	PortalModule
];
