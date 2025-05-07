import { createReducer, on } from '@ngrx/store';
import { list, listFailure, listSuccess } from '../actions/members.action';
import { MemberBasicInfo, MemberError } from '../../models/member.model';

export interface MemberState {
  memberList?: MemberBasicInfo[];
  isLoading: boolean;
  error?: MemberError;
}

export const initialState: MemberState = {
  memberList: [],
  isLoading: false
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
  })
);

