import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import { AuthState } from '../state/reducers/auth.reducer';
import { isLoggedIn } from '../state/selectors/auth.selectors';


@Injectable()
export class AuthGuard  {

    constructor(
        private store: Store<AuthState>,
        private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            )


    }

}
