import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pp2MasukComponent } from './masuk.component';
import { PenggunaComponent } from './components/pengguna/pengguna.component';

export const Pp2MasukComponents: any[] = [
	Pp2MasukComponent,
	PenggunaComponent
];

const routes: Routes = [
	{ path: 'masuk', children:[
		{ path: 'pengguna', component: PenggunaComponent },
		{ path: '', pathMatch: 'full', redirectTo: '/masuk/pengguna' },
		{ path: '**', pathMatch: 'full', redirectTo: '/masuk/pengguna' },
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Pp2MasukRoutingModule { }
