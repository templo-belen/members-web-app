import { createReducer, on } from '@ngrx/store';
import { basicInfo, basicInfoFailure, basicInfoSuccess, list, listFailure, listSuccess } from '../actions/members.action';
import { MemberBasicInfo, MemberError } from '../../models/member.model';

export interface MemberState {
  memberList?: MemberBasicInfo[];
  isLoading: boolean;
  error?: MemberError;
  memberBasicInfo: MemberBasicInfo;
}

export const initialState: MemberState = {
  memberList: [],
  isLoading: false,
  memberBasicInfo: MemberBasicInfo.empty(),
};

export const memberReducer = createReducer(
  initialState,
  on(list, (state) => {
    const memberList: MemberBasicInfo[] = [];
    return { ...state, memberList: memberList, isLoading: true };
  }),
  on(listSuccess, (state, props) => {
    const memberList: MemberBasicInfo[] = props.memberList;
    return { ...state, memberList: memberList, isLoading: false };
  }),
  on(listFailure, (state, props) => {
    const memberList: MemberBasicInfo[] = [];
    return { ...state, memberList: memberList, isLoading: false, error: { msg: props.msg, code: props.code } };
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
);

