import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengurusComponent } from './pengurus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SupirFormComponent } from './components/supir-form/supir-form.component';
import { SupirViewTableComponent } from './components/supir-view-table/supir-view-table.component';
import { MobilFormComponent } from './components/mobil-form/mobil-form.component';
import { MobilViewTableComponent } from './components/mobil-view-table/mobil-view-table.component';
import { SewaViewTableComponent } from './components/sewa-view-table/sewa-view-table.component';
import { PengembalianFormComponent } from './components/pengembalian-form/pengembalian-form.component';
import { PenggunaFormComponent } from './components/pengguna-form/pengguna-form.component';
import { PenggunaViewTableComponent } from './components/pengguna-view-table/pengguna-view-table.component';
import { NavComponent_ } from './components/_nav/_nav.component';

import { PengurusChildrenGuard } from './guards/pengurus-children.guard';

export const PengurusComponents: any[] = [
	PengurusComponent,
	DashboardComponent,
	SupirFormComponent,
	SupirViewTableComponent,
	MobilFormComponent,
	MobilViewTableComponent,
	PengembalianFormComponent,
	SewaViewTableComponent,
	PenggunaFormComponent,
	PenggunaViewTableComponent,
	NavComponent_
]

const routes: Routes = [
	{
		path: 'pengurus', canActivateChild: [PengurusChildrenGuard], component: PengurusComponent, children: [
			{ path: 'mobil', children: [
				{ path: 'tambah', component: MobilFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: MobilViewTableComponent },
				{ path: 'ubah/:id', component: MobilFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/mobil/lihat' }
			] },
			{ path: 'supir', children:[
				{ path: 'tambah', component: SupirFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: SupirViewTableComponent },
				{ path: 'ubah/:id', component: SupirFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/penguruspir/lihat' }
			] },
			{ path: 'penyewaan', component: SewaViewTableComponent, data: { type: 'pengurus' } },
			{ path: 'pengembalian/:id', component: PengembalianFormComponent },
			{ path: 'pengguna', children: [
				{ path: 'tambah', component: PenggunaFormComponent, data: {type: 'tambah'} },
				{ path: 'lihat', component: PenggunaViewTableComponent },
				{ path: 'ubah/:id', component: PenggunaFormComponent, data: {type: 'ubah'} },
				{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/pengguna/lihat' }
			] },
			{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/supir/lihat' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PengurusRoutingModule { }
