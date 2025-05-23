import {createReducer, on} from '@ngrx/store';
import {login, loginFailure, loginSuccess} from '../actions/user.action';
import {LoginError, UserModel} from '../../models/user.model';

export interface UserState {
  currentUser: UserModel;
  isLoading: boolean;
  error: LoginError;
}

export const initialState: UserState = {
  currentUser: { username: '', fullname: ''},
  isLoading: false,
  error: {msg: '', code: 200}
};

export const userReducer = createReducer(
  initialState,
  on(login, (state) => {
    const currentUser: UserModel = {username: '', fullname: ''};
    return {...state, currentUser: currentUser, error: {msg: '', code: 200}, isLoading: true};
  }),
  on(loginSuccess, (state, props) => {
    const currentUser: UserModel = {username: props.username, fullname: props.fullname};
    localStorage.setItem("token", props.token);
    return {...state, currentUser: currentUser, token: props.token};
  }),
  on(loginFailure, (state, props) => {
    const currentUser: UserModel = {username: '', fullname: ''};
    const error: LoginError = {msg: props.msg, code: props.code};
    return {...state, currentUser: currentUser, isLoading: false, error: error};
  })
);
