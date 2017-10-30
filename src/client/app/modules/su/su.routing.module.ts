import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SuComponent } from './su.component';
import { Pp2SuSupirFormComponent } from './components/_supir-form/_supir-form.component';

const routes: Routes = [
	{
		path: 'su', component: Pp2SuComponent, children: [
			{ path: 'supir', children:[
				{ path: 'tambah', component: Pp2SuSupirFormComponent, data: {type: 'tambah'} },
				{ path: 'ubah', component: Pp2SuSupirFormComponent, data: {type: 'ubah'} },
				{ path: 'lihat', component: Pp2SuSupirFormComponent },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/supir/lihat' }
			] },
			{ path: '**', pathMatch: 'full', redirectTo: '/su/supir' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2SuRoutingModule { }
