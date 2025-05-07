import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { listFailure, listSuccess, MembersAction } from '../actions/members.action';
import { exhaustMap, map } from 'rxjs';
import { MemberApiService } from '../../services/member.api.service';
import { MemberListResponseModel } from '../../models/api-response.model';

@Injectable()
export class MemberEffects {
  private _actions$ = inject(Actions);
  private _memberApiService = inject(MemberApiService);

  doMemberList$ = createEffect(
    () => {
      return this._actions$
        .pipe(
          ofType(MembersAction.List),
          exhaustMap(() => {
            return this._memberApiService.list()
              .pipe(
                map(response => {
                  if (response instanceof MemberListResponseModel) {
                    const success = listSuccess(response);
                    return success;
                  } else {
                    return listFailure({ code: response.code, msg: response.msg });
                  }
                }),
              );
          })
        )
    });
}

