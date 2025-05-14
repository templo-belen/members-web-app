import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { basicInfo, list, references, selectedMemberId } from '../state/actions/members.action';
import { selectIsLoading, selectMemberReferences, selectMemberBasicInfo, selectMemberList, selectMemberListError, selectSelectedMemberId } from '../state/selector/member.selector';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private _store = inject(Store);

  public dispatchList() {
    this._store.dispatch(list());
  }

  public dispatchSelectedMemberId(memberId: number) {
    this._store.dispatch(selectedMemberId({ memberId }));
  }

  public fetchMemberList() {
    return this._store.select(selectMemberList);
  }

  public fetchSelectedMemberId() {
    return this._store.select(selectSelectedMemberId);
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
    if (memberId < 1) {
      return;
    }
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
  
  public fetchMemberReferences() {
    return this._store.select(selectMemberReferences);
  }

  public dispatchMemberReferences(memberId: number) {
    if (memberId < 1) {
      console.log("Not selecting member", memberId);
      return;
    }
    this._store.dispatch(references({ memberId }));
  }
}
