import { createAction, props } from '@ngrx/store';
import { MemberBasicInfo } from '../../models/member.model'
import { MemberErrorResponseModel, MemberListResponseModel } from '../../models/api-response.model';

export enum MembersAction {
  List = '[Member] List',
  ListSuccess = '[Member] List Success',
  ListFailure = '[Member] List Failure',

  BasicInfo = '[Member] Basic Info',
  BasicInfoSuccess = '[Member] Basic Info Success',
  BasicInfoFailure = '[Member] Basic Info Failure',
}

export const list = createAction(MembersAction.List);
export const listSuccess = createAction(MembersAction.ListSuccess, props<MemberListResponseModel>());
export const listFailure = createAction(MembersAction.ListFailure, props<MemberErrorResponseModel>());

export const basicInfo = createAction(MembersAction.BasicInfo, props<{ memberId: number }>());
export const basicInfoSuccess = createAction(MembersAction.BasicInfoSuccess, props<MemberBasicInfo>());
export const basicInfoFailure = createAction(MembersAction.BasicInfoFailure, props<MemberErrorResponseModel>());
