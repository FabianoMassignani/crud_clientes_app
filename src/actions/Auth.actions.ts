import * as types from './Auth.constants';

export const loadAllUsers = () => ({
  type: types.LOAD_ALL_USERS,
});

export const loadAllUsersSuccess = (payload: IUser[]) => ({
  type: types.LOAD_ALL_USERS_SUCCESS,
  payload,
});

export const loadAllUsersFailed = () => ({
  type: types.LOAD_ALL_USERS_FAILED,
});

export const login = () => ({
  type: types.LOGIN,
});

export const loginSuccess = (payload: IUser) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginFailed = () => ({
  type: types.LOGIN_FAILED,
});

export const register = () => ({
  type: types.REGISTER,
});

export const registerSuccess = (payload: IUser) => ({
  type: types.REGISTER_SUCCESS,
  payload,
});

export const registerFailed = () => ({
  type: types.REGISTER_FAILED,
});

export const updateUser = () => ({
  type: types.UPDATE_USER,
});

export const updateUserSuccess = (payload: IUser) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserFailed = () => ({
  type: types.UPDATE_USER_FAILED,
});

export const userLoaded = (payload: IUser) => ({
  type: types.USER_LOADED,
  payload,
});

export const deleteUser = () => ({
  type: types.DELETE_USER,
});

export const deleteUserSuccess = () => ({
  type: types.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: types.DELETE_USER_FAILED,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});
