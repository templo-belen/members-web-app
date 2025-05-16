import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MemberBasicInfo, MemberError, MemberListItem } from '../../models/member.model';
import { MemberState } from '../reducers/member.reducer';
import { MemberReference } from '../../models/member-reference-model';

const selectMemberState = createFeatureSelector<MemberState>('member');

export const selectMemberList = createSelector(
  selectMemberState,
  (state): MemberListItem[] => {
    return state.memberList ?? []
  }
);

export const selectMemberListError = createSelector(
  selectMemberState,
  (state): MemberError => {
    return state.error ?? { msg: '', code: 200 };
  }
);

export const selectIsLoading = createSelector(
  selectMemberState,
  (state): boolean => {
    return state.isLoading ?? false
  }
);

export const selectSelectedMemberId = createSelector(
  selectMemberState,
  (state): number => {
    return state.selectedMemberId ?? -1
  }
);

export const selectMemberBasicInfo = createSelector(
  selectMemberState,
  (state): MemberBasicInfo => {
    return state.memberBasicInfo ?? new MemberBasicInfo()
  }
);

export const selectMemberReferences = createSelector(
  selectMemberState,
  (state): MemberReference => {
    return state.memberReferences ?? MemberReference.empty()
  }
);
