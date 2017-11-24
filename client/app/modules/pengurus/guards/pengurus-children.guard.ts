import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PengurusChildrenGuard implements CanActivateChild {
	constructor(
		public $_ngRouter: Router,
		public $_matSnackBar: MatSnackBar
	){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (!localStorage['masukPengurus']) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.$_ngRouter.navigate(['masuk', 'pengurus']);
		}
		let MasukPengurus;
		try{
			MasukPengurus = JSON.parse(localStorage.masukPengurus);
		}catch(e){
			MasukPengurus = {};
		}
		const retVal = MasukPengurus['username'] == 'admin' && MasukPengurus['password'] == 'admin';
		if (!retVal) {
			this.$_matSnackBar.open('Password atau Username Salah')
			setTimeout(()=>{
				this.$_matSnackBar.dismiss()
			},4000)
			this.$_ngRouter.navigate(['masuk','pengurus'])
		}
		return retVal;
	}
}
