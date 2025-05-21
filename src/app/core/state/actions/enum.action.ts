import {createAction, props} from '@ngrx/store';
import {ErrorResponseModel} from '../../models/api-response.model';
import {EnumResponseModel} from '../../models/enum.model';

export enum EnumAction {
  List = '[Enum] List',
  ListSuccess = '[Enum] List Success',
  ListFailure = '[Enum] List Failure',
}

export const list = createAction(EnumAction.List, props<{ names: string[] }>());
export const listSuccess = createAction(EnumAction.ListSuccess, props<{ enumMap: EnumResponseModel }>());
export const listFailure = createAction(EnumAction.ListFailure, props<ErrorResponseModel>());
