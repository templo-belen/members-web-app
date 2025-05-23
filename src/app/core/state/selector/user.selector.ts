import {createSelector} from '@ngrx/store';
import {LoginError, UserModel} from '../../models/user.model';

const currentUserSelector = (state: any): UserModel => state.user.currentUser;
const currentLoginError = (state: any): LoginError => {
  return state.user.error;
};

export const selectCurrentUser = createSelector(
  currentUserSelector,
  (state): UserModel => {
    return {username: state.username, fullname: state.fullname};
  }
);

export const selectLoginError = createSelector(
  currentLoginError,
  (state): LoginError => {
    return state;
  }
);
