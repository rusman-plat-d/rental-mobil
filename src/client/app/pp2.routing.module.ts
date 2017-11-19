import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MobilViewGridComponent } from './components/mobil-view-grid/mobil-view-grid.component';
import { MasukComponent } from './components/masuk/masuk.component';

export const Pp2Components = [
	HomeComponent,
	DevComponent,
	UserRegisterComponent,
	MobilViewGridComponent,
	MasukComponent
];

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'masuk', children:[
		{ path: 'pengguna', component: MasukComponent, data: {type: 'Pengguna'} },
		{ path: 'pengurus', component: MasukComponent, data: {type: 'Pengurus'} },
		{ path: '**', pathMatch: 'full', redirectTo: '/masuk/pengguna' }
	] },
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
