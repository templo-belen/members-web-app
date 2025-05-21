import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { basicInfo, generalInfo, list, references, selectedMemberId, dewInfo } from '../state/actions/members.action';
import {
  selectIsLoading,
  selectMemberBasicInfo,
  selectMemberGeneralInfo,
  selectMemberList,
  selectMemberListError,
  selectMemberReferences,
  selectSelectedMemberId,
  selectMemberDewInfo
} from '../state/selector/member.selector';

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

  public dispatchMemberGeneralInfo(memberId: number) {
    if (memberId < 1) {
      return;
    }
    this._store.dispatch(generalInfo({ memberId }));
  }

  public fetchMemberGeneralInfo() {
    return this._store.select(selectMemberGeneralInfo);
  }

  public fetchMemberReferences() {
    return this._store.select(selectMemberReferences);
  }

  public dispatchMemberReferences(memberId: number) {
    return this._store.dispatch(references({ memberId }));
  }

  public dispatchMemberDewInfo(memberId: number) {
    if (memberId < 1) {
      return;
    }
    this._store.dispatch(dewInfo({ memberId }));
  }

  public fetchMemberDewInfo() {
    return this._store.select(selectMemberDewInfo);
  }
}

