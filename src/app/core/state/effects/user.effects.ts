import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../../services/user.api.service';
import {
  listRoleFailure,
  listRoleSuccess,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  UserAction
} from '../actions/user.action';
import { exhaustMap, map, of } from 'rxjs';
import { LoginRequestModel } from '../../models/api-request.model';
import { LoginResponseModel } from '../../models/api-response.model';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private _router = inject(Router);
  private _actions$ = inject(Actions);
  private _loginApiService = inject(UserApiService);

  doLogin$ = createEffect(
    () => {
      return this._actions$
        .pipe(
          ofType(UserAction.Login),
          exhaustMap(({username, password}) => {
            const parameters: LoginRequestModel = {username: username, password: password};
            return this._loginApiService.login(parameters)
              .pipe(
                map(response => {
                  if (response instanceof LoginResponseModel) {
                    const success = loginSuccess({
                      username: response.username,
                      fullName: response.fullName,
                      token: response.token
                    });
                    this._router.navigate(['/app']).then();
                    return success;
                  } else {
                    return loginFailure({code: response.code, msg: response.msg});
                  }
                }),
              );
          })
        )
    });

    doLogout$ = createEffect(() => {
      return this._actions$
        .pipe(
          ofType(UserAction.Logout),
          exhaustMap(() => {
            localStorage.removeItem('token');
            this._router.navigate(['/']).then();
            return of(logoutSuccess());
          })
        )
    });

  doRoleList$ = createEffect(
    () => {
      return this._actions$
        .pipe(
          ofType(UserAction.ListRole),
          exhaustMap(() => {
            return this._loginApiService.listRoles()
              .pipe(
                map(response => {
                  if ('code' in response && 'msg' in response) {
                    return listRoleFailure({ code: response.code, msg: response.msg });
                  } else {
                    return listRoleSuccess({ roles: response });
                  }
                }),
              );
          })
        )
    });
}


