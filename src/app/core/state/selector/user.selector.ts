import {createSelector} from '@ngrx/store';
import {LoginError, UserModel} from '../../models/user.model';

const currentUserSelector = (state: any): UserModel => state.currentUser ?? null;
const currentLoginError = (state: any) => state.error ?? null;

export const selectCurrentUser = createSelector(
  currentUserSelector,
  (state): UserModel => {
    return {userId: state.userId, username: state.username};
  }
);

export const selectLoginError = createSelector(
  currentLoginError,
  (state): LoginError => {
    return state === null ? {msg: '', code: 200} : {msg: state.msg, code: state.code};
  }
);
