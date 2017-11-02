import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SuComponent } from './su.component';
import { SupirFormComponent } from './components/supir-form/supir-form.component';
import { SupirViewComponent } from './components/supir-view/supir-view.component';

const routes: Routes = [
	{
		path: 'su', component: Pp2SuComponent, children: [
			{ path: 'supir', children:[
				{ path: 'tambah', component: SupirFormComponent, data: {type: 'tambah'} },
				{ path: 'ubah/:id', component: SupirFormComponent, data: {type: 'ubah'} },
				{ path: 'lihat', component: SupirViewComponent },
				{ path: '**', pathMatch: 'full', component: SupirViewComponent },
				// { path: '**', pathMatch: 'full', redirectTo: '/su/supir/lihat' }
			] },
			{ path: '**', pathMatch: 'full', redirectTo: '/su/supir/lihat' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2SuRoutingModule { }
