import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const Pp2Components = [
	HomeComponent,
	DevComponent,
	UserRegisterComponent
];

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dev', component: DevComponent },
	{ path: 'register', children: [
		{ path: 'user', component: UserRegisterComponent, data: {type: 'tambah'} },
		{ path: '**', pathMatch: 'full', redirectTo: '/register/user' }
	]},
	{ path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class Pp2RoutingModule { }
