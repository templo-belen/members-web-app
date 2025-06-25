import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginError, RoleResponseModel, UserModel } from '../../models/user.model';
import { UserState } from '../reducers/user.reducer';

const currentUserSelector = (state: any): UserModel => state.user.currentUser;
export const selectUserState = createFeatureSelector<UserState>('user');
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

export const selectRoleList = createSelector(
  selectUserState,
  (state): RoleResponseModel[] => state.roleList
);

