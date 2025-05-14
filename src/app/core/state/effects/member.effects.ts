import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {referencesFailure, referencesSuccess,  basicInfoFailure, basicInfoSuccess, listFailure, listSuccess, MembersAction } from '../actions/members.action';
import { exhaustMap, map } from 'rxjs';
import { MemberApiService } from '../../services/member.api.service';
import { MemberListResponseModel } from '../../models/api-response.model';
import { MemberBasicInfo } from '../../models/member.model';
import { MemberReference } from '../../models/member-reference-model';

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

  doMemberBasicInfo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.BasicInfo),
      exhaustMap(({ memberId }) => {
        return this._memberApiService.basicInfoById(memberId).pipe(map(response => {
          if (response instanceof MemberBasicInfo) {
            const success = basicInfoSuccess(response);
            return success;
          } else {
            return basicInfoFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });

  doMemberReferences$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.References),
      exhaustMap(({ memberId }) => {
        return this._memberApiService.referencesById(memberId).pipe(map(response => {
          if (response instanceof MemberReference) {
            const success = referencesSuccess(response);
            return success;
          } else {
            return referencesFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });
}

