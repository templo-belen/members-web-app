import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate: CanActivateFn = (route, state) => {
    if (!this.authService.isAuthenticated()) {
      return this.router.parseUrl('/login');
    }
    return true;
  };
}
