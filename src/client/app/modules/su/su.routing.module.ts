import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SuComponent } from './su.component';
import { SupirFormComponent } from './components/supir-form/supir-form.component';
import { SupirViewComponent } from './components/supir-view/supir-view.component';
import { MobilFormComponent } from './components/mobil-form/mobil-form.component';
import { MobilViewComponent } from './components/mobil-view/mobil-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserViewComponent } from './components/user-view/user-view.component';

export const Pp2SuComponents: any[] = [
	Pp2SuComponent,
	SupirFormComponent,
	SupirViewComponent,
	MobilFormComponent,
	MobilViewComponent,
	UserFormComponent,
	UserViewComponent
];

const routes: Routes = [
	{
		path: 'su', component: Pp2SuComponent, children: [
			{ path: 'supir', children:[
				{ path: 'tambah', component: SupirFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: SupirViewComponent },
				{ path: 'ubah/:id', component: SupirFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/supir/lihat' }
			] },
			{ path: 'mobil', children: [
				{ path: 'tambah', component: MobilFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: MobilViewComponent },
				{ path: 'ubah/:id', component: MobilFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/mobil/lihat' }
			] },
			{ path: 'user', children: [
				{ path: 'tambah', component: UserFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: UserViewComponent },
				{ path: 'ubah/:id', component: UserFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/user/lihat' }
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
