import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _authService = inject(UserService);
  private _router = inject(Router);

  public canActivate: CanActivateFn = () => {
    if (!this._authService.isAuthenticated()) {
      return this._router.parseUrl('/login');
    }
    return true;
  };
}
