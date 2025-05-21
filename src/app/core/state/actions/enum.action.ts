import {createAction, props} from '@ngrx/store';
import {ErrorResponseModel} from '../../models/api-response.model';
import {EnumResponseModel} from '../../models/enum.model';

export enum EnumAction {
  Map = '[Enum] Map',
  MapSuccess = '[Enum] Map Success',
  MapFailure = '[Enum] List Failure',
}

export const map = createAction(EnumAction.Map, props<{ names: string[] }>());
export const mapSuccess = createAction(EnumAction.MapSuccess, props<{ enumMap: EnumResponseModel }>());
export const mapFailure = createAction(EnumAction.MapFailure, props<ErrorResponseModel>());
