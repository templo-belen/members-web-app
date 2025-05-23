import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MemberBasicInfo,
  MemberDewInfo,
  MemberError,
  MemberGeneralInfo,
  MemberFormValues,
  MemberListItem,
  MemberReferences
} from '../../models/member.model';
import { MemberState } from '../reducers/member.reducer';

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

export const selectMemberGeneralInfo = createSelector(
  selectMemberState,
  (state): MemberGeneralInfo => {
    return state.memberGeneralInfo ?? new MemberGeneralInfo()
  }
);

export const selectMemberReferences = createSelector(
  selectMemberState,
  (state): MemberReferences => {
    return state.memberReferences ?? new MemberReferences()
  }
);
export const selectMemberDewInfo = createSelector(
  selectMemberState,
  (state): MemberDewInfo => {
    return state.memberDewInfo ?? new MemberDewInfo()
  }
);

export const selectMemberFormValues = createSelector(
  selectMemberState,
  (state): MemberFormValues => {
    return state.memberFormValues ?? new MemberFormValues()
  }
);
