import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EnumState} from '../reducers/enum.reducer';
import {EnumResponseModel} from '../../models/enum.model';
import {ErrorResponseModel} from '../../models/api-response.model';

const selectEnumState = createFeatureSelector<EnumState>('enum');

export const selectEnumMap = createSelector(
  selectEnumState,
  (state): EnumResponseModel => {
    return state.enumMap ?? {};
  }
);

export const selectEnumMapError = createSelector(
  selectEnumState,
  (state): ErrorResponseModel => {
    return state.error ?? { msg: '', code: 200 };
  }
);

