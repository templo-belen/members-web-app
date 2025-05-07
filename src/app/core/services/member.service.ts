import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { list } from '../state/actions/members.action';
import { selectIsLoading, selectMemberList, selectMemberListError } from '../state/selector/member.selector';

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
}
