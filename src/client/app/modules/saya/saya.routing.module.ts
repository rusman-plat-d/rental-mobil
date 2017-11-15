import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SayaComponent } from './saya.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SewaFormComponent } from './components/sewa-form/sewa-form.component';


import { SayaChildrenGuard } from './guards/saya-children.guard';

export const Pp2SayaComponents: any[] = [
	Pp2SayaComponent,
	DashboardComponent,
	SewaFormComponent
];

const routes: Routes = [
	{ path: 'saya', canActivateChild: [SayaChildrenGuard], children:[
		{ path: '', component: DashboardComponent },
		{ path: 'sewa', children: [
			{ path: '', component: SewaFormComponent },
			{ path: ':idMobil', children:[
				{ path: '', component: SewaFormComponent },
				{ path: ':idSupir', children:[
					{ path: '', component: SewaFormComponent },
				] },
				// { path: '**', pathMatch: 'full', redirectTo: '/saya/sewa' }
			] },
		] },
		{ path: '**', pathMatch: 'full', redirectTo: '/saya' }
	]}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2SayaRoutingModule { }
