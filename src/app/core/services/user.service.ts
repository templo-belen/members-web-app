import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {login} from '../state/actions/user.action';
import {selectCurrentUser, selectLoginError} from '../state/selector/user.selector';
import {LoginError} from '../models/user.model';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _store = inject(Store);

  public dispatchLogin(username: string, password: string) {
    this._store.dispatch(login({username: username, password: password}));
  }

  public fetchCurrentUser() {
    return this._store.select(selectCurrentUser);
  }

  public fetchCurrentLoginError() {
    const predicate: { (a: LoginError, b: LoginError): boolean } = (a, b) => {
      return LoginError.isValid(a) && LoginError.isValid(b) && a.code === b.code && a.msg === b.msg
    };
    return this._store.selectSignal(selectLoginError, {equal: predicate});
  }

  public registerUser(): Observable<any> {
    return of();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this._isTokenExpired(token);

  }

  private _isTokenExpired(token: string | null | undefined): boolean {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp * 1000 < Date.now();
      }
      return true;
    } catch (error) {
      // Token is invalid or malformed
      return true;
    }
  }

}
