import {EnumResponseModel} from '../../models/enum.model';
import {ErrorResponseModel} from '../../models/api-response.model';
import {createReducer, on} from '@ngrx/store';
import {list, listFailure, listSuccess} from '../actions/enum.action';

export interface EnumState {
    enumMap: EnumResponseModel;
    isLoading: boolean;
    error?: ErrorResponseModel;
}

export const initialState: EnumState = {
    enumMap: {},
    isLoading: false,
}

export const enumReducer = createReducer(
    initialState,
    on(list, (state) => {
        const enumMap: EnumResponseModel = {};
        return {...state, enumMap: enumMap, isLoading: true};
    }),
    on(listSuccess, (state, props) => {
        const enumMap: EnumResponseModel = props.enumMap;
        return {...state, enumMap: enumMap, isLoading: false};
    }),
    on(listFailure, (state, props) => {
        const enumMap: EnumResponseModel = {};
        return {...state, enumMap: enumMap, isLoading: false, error: {msg: props.msg, code: props.code}};
    })
);
