import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { basicInfo, list } from '../state/actions/members.action';
import { selectIsLoading, selectMemberBasicInfo, selectMemberList, selectMemberListError } from '../state/selector/member.selector';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private _store = inject(Store);

  public dispatchList() {
    this._store.dispatch(list());
  }

  public fetchMemberList() {
    return this._store.select(selectMemberList);
  }

  public fetchCurrentMemberListError() {
    return this._store.select(selectMemberListError);
  }

  public fetchIsLoading() {
    return this._store.select(selectIsLoading);
  }

  public fetchMemberBasicInfo() {
    return this._store.select(selectMemberBasicInfo);
  }

  public dispatchMemberBasicInfo(memberId: number) {
    this._store.dispatch(basicInfo({ memberId }));
  }

  public fetchMemberEnums() {
    // TODO: fetch member enums
    // https://github.com/templo-belen/members-web-app/issues/35
    return undefined
  }

  public dispatchMemberEnums(memberId: number) {
    // TODO: add member enums to the store
    // https://github.com/templo-belen/members-web-app/issues/35
  }
}
