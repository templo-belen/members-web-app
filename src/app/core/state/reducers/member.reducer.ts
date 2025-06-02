import {createReducer, on} from '@ngrx/store';
import {
  basicInfoCreate,
  basicInfoCreateSuccess,
  list,
  listFailure,
  listSuccess,
  memberFormValues,
  memberFormValuesFailure,
  memberFormValuesSuccess,
  memberInfo,
  memberInfoFailure,
  memberInfoSuccess,
  selectedMemberId
} from '../actions/members.action';
import {
  MemberBasicInfo,
  MemberDewInfo,
  MemberError,
  MemberFormValues,
  MemberGeneralInfo,
  MemberListItem,
  MemberReferences,
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
  on(memberInfo, (state, props) => {
    return state;
  }),
  on(memberInfoSuccess, (state, props) => {
    return {
      ...state,
      memberBasicInfo: props.personalInformation ?? new MemberBasicInfo(),
      memberGeneralInfo: props.generalData ?? new MemberGeneralInfo(),
      memberReferences: props.references ?? new MemberReferences(),
    };
  }),
  on(memberInfoFailure, (state, props) => {
    return state;
  }),
  on(basicInfoCreate, (state, props) => {
    return state;
  }),
  on(basicInfoCreateSuccess, (state, props) => {
    return state;
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
