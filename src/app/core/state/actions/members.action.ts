import { createAction, props } from '@ngrx/store';
import { MemberBasicInfo, MemberDewInfo, MemberGeneralInfo, MemberReferences } from '../../models/member.model'
import { MemberErrorResponseModel, MemberListResponseModel } from '../../models/api-response.model';

export enum MembersAction {
  List = '[Member] List',
  ListSuccess = '[Member] List Success',
  ListFailure = '[Member] List Failure',

  SelectedMemberId = '[Member] Selected Member ID',

  BasicInfo = '[Member] Basic Info',
  BasicInfoSuccess = '[Member] Basic Info Success',
  BasicInfoFailure = '[Member] Basic Info Failure',

  GeneralInfo = '[Member] General Info',
  GeneralInfoSuccess = '[Member] General Info Success',
  GeneralInfoFailure = '[Member] General Info Failure',

  References = '[Member] References',
  ReferencesSuccess = '[Member] References Success',
  ReferencesFailure = '[Member] References Failure',

  DewInfo = '[Member] Dew Info',
  DewInfoSuccess = '[Member] Dew Info Success',
  DewInfoFailure = '[Member] Dew Info Failure',
}

export const list = createAction(MembersAction.List);
export const listSuccess = createAction(MembersAction.ListSuccess, props<MemberListResponseModel>());
export const listFailure = createAction(MembersAction.ListFailure, props<MemberErrorResponseModel>());

export const selectedMemberId = createAction(MembersAction.SelectedMemberId, props<{ memberId: number }>());

export const basicInfo = createAction(MembersAction.BasicInfo, props<{ memberId: number }>());
export const basicInfoSuccess = createAction(MembersAction.BasicInfoSuccess, props<MemberBasicInfo>());
export const basicInfoFailure = createAction(MembersAction.BasicInfoFailure, props<MemberErrorResponseModel>());

export const generalInfo = createAction(MembersAction.GeneralInfo, props<{ memberId: number }>());
export const generalInfoSuccess = createAction(MembersAction.GeneralInfoSuccess, props<MemberGeneralInfo>());
export const generalInfoFailure = createAction(MembersAction.GeneralInfoFailure, props<MemberErrorResponseModel>());

export const references = createAction(MembersAction.References, props<{ memberId: number }>());
export const referencesSuccess = createAction(MembersAction.ReferencesSuccess, props<MemberReferences>());
export const referencesFailure = createAction(MembersAction.ReferencesFailure, props<MemberErrorResponseModel>());

export const dewInfo = createAction(MembersAction.DewInfo, props<{ memberId: number }>());
export const dewInfoSuccess = createAction(MembersAction.DewInfoSuccess, props<MemberDewInfo>());
export const dewInfoFailure = createAction(MembersAction.DewInfoFailure, props<MemberErrorResponseModel>());
