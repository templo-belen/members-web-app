import {createAction, props} from '@ngrx/store';
import {MemberBasicInfo, MemberFormValues, MemberInformation} from '../../models/member.model'
import {ErrorResponseModel, MemberListResponseModel} from '../../models/api-response.model';

export enum MembersAction {
  List = '[Member] List',
  ListSuccess = '[Member] List Success',
  ListFailure = '[Member] List Failure',

  SelectedMemberId = '[Member] Selected Member ID',

  MemberInfo = '[Member] Member Info',
  MemberInfoSuccess = '[Member] Member Info Success',
  MemberInfoFailure = '[Member] Member Info Failure',

  BasicInfoCreate = '[Member] Basic Info Create',
  BasicInfoCreateSuccess = '[Member] Basic Info Create Success',

  MemberFormValues = '[Member] Member Form Values',
  MemberFormValuesSuccess = '[Member] Member Form Values Success',
  MemberFormValuesFailure = '[Member] Member Form Values Failure',

}

export const list = createAction(MembersAction.List);
export const listSuccess = createAction(MembersAction.ListSuccess, props<MemberListResponseModel>());
export const listFailure = createAction(MembersAction.ListFailure, props<ErrorResponseModel>());

export const selectedMemberId = createAction(MembersAction.SelectedMemberId, props<{ memberId: number }>());

export const memberInfo = createAction(MembersAction.MemberInfo, props<{ memberId: number }>());
export const memberInfoSuccess = createAction(MembersAction.MemberInfoSuccess, props<MemberInformation>());
export const memberInfoFailure = createAction(MembersAction.MemberInfoFailure, props<ErrorResponseModel>());

export const basicInfoCreate = createAction(MembersAction.BasicInfoCreate, props<MemberBasicInfo>());
export const basicInfoCreateSuccess = createAction(MembersAction.BasicInfoCreateSuccess, props<MemberBasicInfo>());

export const memberFormValues = createAction(MembersAction.MemberFormValues);
export const memberFormValuesSuccess = createAction(MembersAction.MemberFormValuesSuccess, props<MemberFormValues>());
export const memberFormValuesFailure = createAction(MembersAction.MemberFormValuesFailure, props<ErrorResponseModel>());
