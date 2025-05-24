import { createReducer, on } from '@ngrx/store';
import {
  basicInfo,
  basicInfoFailure,
  basicInfoSuccess,
  dewInfo,
  dewInfoFailure,
  dewInfoSuccess,
  generalInfo,
  generalInfoFailure,
  generalInfoSuccess,
  memberFormValues, memberFormValuesFailure, memberFormValuesSuccess,
  list,
  listFailure,
  listSuccess,
  references,
  referencesFailure,
  referencesSuccess,
  selectedMemberId
} from '../actions/members.action';
import {
  MemberBasicInfo,
  MemberDewInfo,
  MemberError,
  MemberGeneralInfo,
  MemberFormValues,
  MemberListItem,
  MemberReferences
} from '../../models/member.model';

export interface MemberState {
  memberList?: MemberListItem[];
  isLoading: boolean;
  error?: MemberError;
  selectedMemberId: number;
  memberBasicInfo: MemberBasicInfo;
  memberGeneralInfo: MemberGeneralInfo;
  memberReferences: MemberReferences;
  memberDewInfo: MemberDewInfo;
  memberFormValues: MemberFormValues;

}

export const initialState: MemberState = {
  memberList: [],
  isLoading: false,
  selectedMemberId: -1,
  memberBasicInfo: new MemberBasicInfo(),
  memberGeneralInfo: new MemberGeneralInfo(),
  memberReferences: new MemberReferences(),
  memberDewInfo: new MemberDewInfo(),
  memberFormValues: new MemberFormValues(),

};

export const memberReducer = createReducer(
  initialState,
  on(list, (state) => {
    const memberList: MemberListItem[] = [];
    return { ...state, memberList: memberList, isLoading: true };
  }),
  on(listSuccess, (state, props) => {
    const memberList: MemberListItem[] = props.memberList;
    return { ...state, memberList: memberList, isLoading: false };
  }),
  on(listFailure, (state, props) => {
    const memberList: MemberListItem[] = [];
    return { ...state, memberList: memberList, isLoading: false, error: { msg: props.msg, code: props.code } };
  }),
  on(selectedMemberId, (state, { memberId }) => {
    if (memberId <= 0) {
      return {
        ...state,
        selectedMemberId: 0,
        memberBasicInfo: new MemberBasicInfo(),
        memberGeneralInfo: new MemberGeneralInfo(),
        memberReferences: new MemberReferences(),
      };
    }

    return { ...state, selectedMemberId: memberId };
  }),
  on(basicInfo, (state, props) => {
    return state;
  }),
  on(basicInfoSuccess, (state, props) => {
    return { ...state, memberBasicInfo: props };
  }),
  on(basicInfoFailure, (state, props) => {
    return state;
  }),
  on(generalInfo, (state, props) => {
    return state;
  }),
  on(generalInfoSuccess, (state, props) => {
    return { ...state, memberGeneralInfo: props };
  }),
  on(generalInfoFailure, (state, props) => {
    return state;
  }),
  on(references, (state, props) => {
    return state;
  }),
  on(referencesSuccess, (state, props) => {
    return { ...state, memberReferences: props };
  }),
  on(referencesFailure, (state) => {
    return state;
  }),
  on(dewInfo, (state, props) => {
    return state;
  }),
  on(dewInfoSuccess, (state, props) => {
    return { ...state, memberDewInfo: props };
  }),
  on(dewInfoFailure, (state, props) => {
    return { ...state, error: { msg: props.msg, code: props.code } };
  }),

  // All data for init member forms
  on(memberFormValues, (state) => {
    return state;
  }),
  on(memberFormValuesSuccess, (state, props) => {
    return { ...state, memberFormValues: props };
  }),
  on(memberFormValuesFailure, (state, props) => {
    return { ...state, error: { msg: props.msg, code: props.code } };
  }),
);
