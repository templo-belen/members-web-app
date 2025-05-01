import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from '../../services/user.api.service';
import {loginFailure, loginSuccess, UserAction} from '../actions/user.action';
import {exhaustMap, map, switchMap} from 'rxjs';
import {LoginRequestModel} from '../../models/api-request.model';
import {LoginResponseModel} from '../../models/api-response.model';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private loginApiService = inject(UserApiService);

  doLogin$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(UserAction.Login),
          switchMap(({username, password}) => {
            const parameters: LoginRequestModel = {username: username, password: password};
            return this.loginApiService.login(parameters)
              .pipe(
                map(response => {
                  if (response instanceof LoginResponseModel) {
                    return loginSuccess({userId: response.userId, username: response.username, token: response.token});
                  } else {
                    return loginFailure({code: response.code, msg: response.msg});
                  }
                }),
              );
          })
        )
    });
}
