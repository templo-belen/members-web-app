import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from '../../services/user.api.service';
import {loginFailure, loginSuccess, UserAction} from '../actions/user.action';
import {exhaustMap, map} from 'rxjs';
import {LoginRequestModel} from '../../models/api-request.model';
import {LoginResponseModel} from '../../models/api-response.model';
import {Router} from '@angular/router';

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
                      fullname: response.full_name,
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
}
