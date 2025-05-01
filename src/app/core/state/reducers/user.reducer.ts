import {createReducer, on, State} from '@ngrx/store';
import {login, loginFailure, loginSuccess, UserAction} from '../actions/user.action';
import {LoginError, UserModel} from '../../models/user.model';

export interface UserState {
  currentUser?: UserModel;
  token?: string;
  isLoading: boolean;
  error?: LoginError;
}

export const initialState: UserState = {
  isLoading: false
};

export const userReducer = createReducer(
  initialState,
  on(login, (state) => {
    const currentUser: UserModel = {userId: -1, username: ''};
    return {...state, currentUser: currentUser, isLoading: true};
  }),
  on(loginSuccess, (state, props) => {
    const currentUser: UserModel = {userId: props.userId, username: props.username};
    localStorage.setItem("token", props.token);
    localStorage.setItem("authenticated", 'true');
    return {...state, currentUser: currentUser, token: props.token};
  }),
  on(loginFailure, (state, props) => {
    const currentUser: UserModel = {userId: -1, username: ''};
    return {...state, currentUser: currentUser, isLoading: false, error: {msg: props.msg, code: props.code}};
  })
);
