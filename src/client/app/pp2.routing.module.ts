import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MobilViewGridComponent } from './components/mobil-view-grid/mobil-view-grid.component';

export const Pp2Components = [
	HomeComponent,
	DevComponent,
	UserRegisterComponent,
	MobilViewGridComponent
];

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'pendaftaran', children: [
		{ path: 'pengguna', component: UserRegisterComponent, data: {type: 'tambah'} },
		{ path: '**', pathMatch: 'full', redirectTo: '/pendaftaran/pengguna' }
	]},
	{ path: 'dev', component: DevComponent },
	{ path: 'mobil', component: MobilViewGridComponent },
	{ path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class Pp2RoutingModule { }
