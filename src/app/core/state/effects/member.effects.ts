import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  basicInfoFailure,
  basicInfoSuccess,
  dewInfoFailure,
  dewInfoSuccess,
  generalInfoSuccess, memberFormValues, memberFormValuesFailure, memberFormValuesSuccess,
  listFailure,
  listSuccess,
  MembersAction,
  referencesFailure,
  referencesSuccess
} from '../actions/members.action';
import {exhaustMap, map} from 'rxjs';
import {MemberApiService} from '../../services/member.api.service';
import {MemberListResponseModel} from '../../models/api-response.model';
import {
  MemberBasicInfo,
  MemberDewInfo,
  MemberGeneralInfo,
  MemberFormValues,
  MemberReferences
} from '../../models/member.model';

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
                    return listSuccess(response);
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
            return basicInfoSuccess(response);
          } else {
            return basicInfoFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });

  doMemberGeneralInfo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.GeneralInfo),
      exhaustMap(({ memberId }) => {
        return this._memberApiService.generalInfoById(memberId).pipe(map(response => {
          if (response instanceof MemberGeneralInfo) {
            return generalInfoSuccess(response);
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
          if (response instanceof MemberReferences) {
            return referencesSuccess(response);
          } else {
            return referencesFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });

  doGetDewMemberInfo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.DewInfo),
      exhaustMap(({ memberId }) => {
        return this._memberApiService.dewInfoById(memberId).pipe(map(response => {
          if (response instanceof MemberDewInfo) {
            return dewInfoSuccess(response);
          } else {
            return dewInfoFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });

  doMemberFormValues$ = createEffect(
    () => {
      return this._actions$
        .pipe(
          ofType(MembersAction.MemberFormValues),
          exhaustMap(() => {
            return this._memberApiService.memberFormValues()
              .pipe(
                map(response => {
                  if (response instanceof MemberFormValues) {
                    return memberFormValuesSuccess(response);
                  } else {
                    return memberFormValuesFailure({ code: response.code, msg: response.msg });
                  }
                }),
              );
          })
        )
    });
}
