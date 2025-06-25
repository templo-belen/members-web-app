import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  basicInfoCreateSuccess,
  listFailure,
  listSuccess,
  memberFormValuesFailure,
  memberFormValuesSuccess,
  memberInfoFailure,
  memberInfoSuccess,
  MembersAction, updateBasicInfoFailure, updateBasicInfoSuccess
} from '../actions/members.action';
import {exhaustMap, map} from 'rxjs';
import {MemberApiService} from '../../services/member.api.service';
import {MemberListResponseModel} from '../../models/api-response.model';
import {MemberBasicInfo, MemberFormValues, MemberInformation} from '../../models/member.model';

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

  doMemberInfo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.MemberInfo),
      exhaustMap(({ memberId }) => {
        return this._memberApiService.getMemberById(memberId).pipe(map(response => {
          if (response instanceof MemberInformation) {
            return memberInfoSuccess(response);
          } else {
            console.log("Error", response);
            return memberInfoFailure({ code: response.code, msg: response.msg });
          }
        }),
        );
      })
    )
  });

  doMemberBasicInfoCreate$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(MembersAction.BasicInfoCreate),
      exhaustMap(memberBasicInfo => {
        return this._memberApiService.createBasicInfo(memberBasicInfo).pipe(map(response => {
          if (response instanceof MemberBasicInfo) {
            return basicInfoCreateSuccess(response);
          } else {
            return memberInfoFailure({ code: response.code, msg: response.msg });
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

  onMemberBasicInfoUpdate$ = createEffect(() => {
    return this._actions$
      .pipe(
        ofType(MembersAction.UpdateMemberBasicInfo),
        exhaustMap((basicInfo) => {
          return this._memberApiService.updateBasicInfo(basicInfo)
            .pipe(
              map(response => {
                if (response instanceof MemberBasicInfo) {
                  return updateBasicInfoSuccess(response);
                } else {
                  return updateBasicInfoFailure({ code: response.code, msg: response.msg });
                }
              })
            )
        })
      )
  });
}
