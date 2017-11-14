import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { User } from '../../_dry/index';

@Injectable()
export class SayaChildrenGuard implements CanActivateChild {
	constructor(
		public $_ngRouter: Router
	){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!localStorage.masukPengguna) {
			this.$_ngRouter.navigate(['masuk']);
		}
		let User$: User[];
		let MasukUser: User;
		try{
			User$ = JSON.parse(localStorage.user);
			MasukUser = JSON.parse(localStorage.masukPengguna);
		}catch(e){
			User$ = [];
			MasukUser = {};
		}
		const hasil: User[] = User$.filter((user: User) => {
			return (user.username == MasukUser.username) && (user.password == MasukUser.password);
		});
		let retVal = false;
		if ( hasil.length == 1 ) {
			retVal = true;
			localStorage.ggPengguna = JSON.stringify(hasil[0]);
			localStorage.ezPengguna = 'o';
		}else{
			localStorage.ezPengguna = 'x';
		}
		return retVal;
	}
}
