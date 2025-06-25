import { createAction, props } from '@ngrx/store';
import { ErrorResponseModel } from '../../models/api-response.model';
import { RoleResponseModel } from '../../models/user.model';

export enum UserAction {
  Login = '[Login] Login',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  Logout = '[Login] Logout',
  LogoutSuccess = '[Login] Logout Success',
  LogoutFailure = '[Login] Logout Failure',

  ListRole = '[Role] ListRole',
  ListRoleSuccess = '[Role] ListRoleSuccess',
  ListRoleFailure = '[Role] ListRoleFailure',
}

export const login = createAction(UserAction.Login, props<{ username: string, password: string }>());
export const loginSuccess = createAction(UserAction.LoginSuccess, props<{ fullname: string, username: string, token: string }>());
export const loginFailure = createAction(UserAction.LoginFailure, props<{ code: number, msg: string }>());
export const logout = createAction(UserAction.Logout);
export const logoutSuccess = createAction(UserAction.LogoutSuccess);

export const listRole = createAction(UserAction.ListRole);
export const listRoleSuccess = createAction(UserAction.ListRoleSuccess, props<{ roles: RoleResponseModel[] }>());
export const listRoleFailure = createAction(UserAction.ListRoleFailure, props<ErrorResponseModel>());
