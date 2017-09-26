import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";

import { AngularFireModule }         from 'angularfire2';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CdkModules, MatModules } from './material.module';

import { firebaseConfig } from '../../../environments/firebase';

export const RequireModule = [
	BrowserAnimationsModule,
	FlexLayoutModule,
	FormsModule,
	NoopAnimationsModule,
	ReactiveFormsModule,
	RouterModule,

	AngularFireModule.initializeApp(firebaseConfig, 'pp2-rental'),
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFirestoreModule.enablePersistence(),

	...CdkModules,
	...MatModules
];
