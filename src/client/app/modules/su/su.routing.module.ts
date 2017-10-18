import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SuComponent } from './su.component';
import { Pp2SuFormSupirComponent } from './components/_form-supir/_form-supir.component';

const routes: Routes = [
	{
		path: 'su', component: Pp2SuComponent, children: [
			{ path: 'dashboard', component: Pp2SuFormSupirComponent },
			{ path: '**', pathMatch: 'full', redirectTo: '/su/dashboard' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2SuRoutingModule { }
