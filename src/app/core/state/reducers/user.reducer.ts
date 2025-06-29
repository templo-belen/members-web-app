import { createReducer, on } from '@ngrx/store';
import {
  listRole,
  listRoleFailure,
  listRoleSuccess,
  login,
  loginFailure,
  loginSuccess,
  logoutSuccess
} from '../actions/user.action';
import { LoginError, RoleResponseModel, UserModel } from '../../models/user.model';

export interface UserState {
  currentUser: UserModel;
  isLoading: boolean;
  error: LoginError;
  roleList: RoleResponseModel[];
}

export const initialState: UserState = {
  currentUser: { username: '', fullName: ''},
  isLoading: false,
  error: {msg: '', code: 200},
  roleList : [],
};

export const userReducer = createReducer(
  initialState,
  on(login, (state) => {
    const currentUser: UserModel = {username: '', fullName: ''};
    return {...state, currentUser: currentUser, error: {msg: '', code: 200}, isLoading: true};
  }),
  on(loginSuccess, (state, props) => {
    const currentUser: UserModel = {username: props.username, fullName: props.fullName};
    localStorage.setItem("token", props.token);
    return {...state, currentUser: currentUser, token: props.token};
  }),
  on(loginFailure, (state, props) => {
    const currentUser: UserModel = {username: '', fullName: ''};
    const error: LoginError = {msg: props.msg, code: props.code};
    return {...state, currentUser: currentUser, isLoading: false, error: error};
  }),
  on(logoutSuccess, (state) => {
    const currentUser: UserModel = {username: '', fullName: ''};
    return {...state, currentUser: currentUser, error: {msg: '', code: 200}, isLoading: false};
  }),

  on(listRole, (state) => {
    const roleList: RoleResponseModel[] = [];
    return { ...state, roleList: roleList, isLoading: true };
  }),
  on(listRoleSuccess, (state, props) => {
    const roleList: RoleResponseModel[] = props.roles;
    return { ...state, roleList: roleList, isLoading: false };
  }),
  on(listRoleFailure, (state, props) => {
    const roleList: RoleResponseModel[] = [];
    return { ...state, roleList: roleList, isLoading: false, error: { msg: props.msg, code: props.code } };
  }),
);
