import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> => {
    console.log(sessionStorage.getItem('Bearer Token'));
    if (sessionStorage.getItem('Bearer Token')) {
      console.log(sessionStorage.getItem('Bearer Token'));
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}