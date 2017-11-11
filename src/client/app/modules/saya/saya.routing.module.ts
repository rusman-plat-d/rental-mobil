import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SayaComponent } from './saya.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const Pp2SayaComponents: any[] = [
	Pp2SayaComponent,
	DashboardComponent
];

const routes: Routes = [
	{ path: 'saya', children:[
		{ path: '', component: DashboardComponent },
		{ path: '**', pathMatch: 'full', redirectTo: '/saya/dashboard' },
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2SayaRoutingModule { }
