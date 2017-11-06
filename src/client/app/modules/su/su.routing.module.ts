import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2SuComponent } from './su.component';
import { SupirFormComponent } from './components/supir-form/supir-form.component';
import { SupirViewTableComponent } from './components/supir-view-table/supir-view-table.component';
import { MobilFormComponent } from './components/mobil-form/mobil-form.component';
import { MobilViewTableComponent } from './components/mobil-view-table/mobil-view-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserViewTableComponent } from './components/user-view-table/user-view-table.component';

export const Pp2SuComponents: any[] = [
	Pp2SuComponent,
	SupirFormComponent,
	SupirViewTableComponent,
	MobilFormComponent,
	MobilViewTableComponent,
	UserFormComponent,
	UserViewTableComponent
];

const routes: Routes = [
	{
		path: 'su', component: Pp2SuComponent, children: [
			{ path: 'supir', children:[
				{ path: 'tambah', component: SupirFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: SupirViewTableComponent },
				{ path: 'ubah/:id', component: SupirFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/supir/lihat' }
			] },
			{ path: 'mobil', children: [
				{ path: 'tambah', component: MobilFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: MobilViewTableComponent },
				{ path: 'ubah/:id', component: MobilFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/mobil/lihat' }
			] },
			{ path: 'pengguna', children: [
				{ path: 'tambah', component: UserFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: UserViewTableComponent },
				{ path: 'ubah/:id', component: UserFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/su/pengguna/lihat' }
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
