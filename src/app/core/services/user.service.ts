import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {login} from '../state/actions/user.action';
import {selectCurrentUser, selectLoginError} from '../state/selector/user.selector';

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
    return this._store.select(selectLoginError);
  }

  public registerUser(): Observable<any> {
    return of();
  }

  public isAuthenticated(): boolean {
    // Logica para determinar si esta autenticado
    return false;
  }
}
