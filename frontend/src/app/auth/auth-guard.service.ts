import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn == true){
        return isLoggedIn
    }
    else {
        this.router.navigate(["/auth/login"]);
        return isLoggedIn
    }
  }
}
