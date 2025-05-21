import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EnumApiService} from '../../services/enum.api.service';
import {exhaustMap, map} from 'rxjs';
import {EnumAction, mapFailure, mapSuccess} from '../actions/enum.action';
import {EnumResponseModel} from '../../models/enum.model';

@Injectable()
export class EnumEffects{

  private _actions$ = inject(Actions);
  private _enumApiService = inject(EnumApiService);

  doEnumList$ = createEffect(
    () => {
      return this._actions$
        .pipe(
          ofType(EnumAction.Map),
          exhaustMap(({ names }) => {
            return this._enumApiService.enumsByNames(names)
              .pipe(
                map(response => {
                  if (response instanceof EnumResponseModel) {
                    return mapSuccess({enumMap : response});
                  } else {
                    return mapFailure({ code: response.code, msg: response.msg });
                  }
                }),
              );
          })
        )
    }
  );
}
