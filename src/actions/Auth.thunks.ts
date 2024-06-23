import * as actions from './Auth.actions';
import { Dispatch } from 'redux';
import { getAll, post, put, del } from '../utils/request';
import { userAPIUrl, authAPIUrl } from '../constants/urls';

export const loadUser = () => async (dispatch: Dispatch) => {
  const userJson = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userJson) as IUser;

  try {
    if (user) {
      dispatch(actions.userLoaded(user));
    }
  } catch (error) {
    return;
  }
};

export const loadAllUsers =
  (
    accessToken: string | null,
    search?: string,
    limit?: number,
    page?: number
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await getAll(
        `${userAPIUrl}/getAll`,
        accessToken,
        search || '',
        limit || 10,
        page || 0
      );

      dispatch(actions.loadAllUsers());
      if (res) {
        dispatch(actions.loadAllUsersSuccess(res.data));
      } else {
        dispatch(actions.loadAllUsersFailed());
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(actions.logoutSuccess());
      }
      dispatch(actions.loadAllUsersFailed());
    }
  };

export const login = (data: ReqLogin) => async (dispatch: Dispatch) => {
  const { email, password } = data;

  try {
    dispatch(actions.login());

    const response = await post(`${authAPIUrl}/signIn`, { email, password });

    const user = response.data;

    if (user.accessToken) {
      dispatch(actions.loginSuccess(user));
    } else {
      dispatch(actions.loginFailed());
    }
  } catch (error: any) {
    dispatch(actions.loginFailed());
  }
};

export const register =
  (data: ReqRegister, navigate: (path: string) => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(actions.register());

      const res = await post(`${userAPIUrl}`, data);

      if (res) {
        dispatch(actions.registerSuccess(res.data.user));
        navigate('/login');
      } else {
        dispatch(actions.registerFailed());
      }
    } catch (error: any) {
      dispatch(actions.registerFailed());
    }
  };

export const updateUser =
  (data: ReqUpdateUser, accessToken: string, callback: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(actions.updateUser());

      const res = await put(`${userAPIUrl}`, data, accessToken);

      if (res) {
        dispatch(actions.updateUserSuccess(res.data));
        callback();
      } else {
        dispatch(actions.updateUserFailed());
      }
    } catch (error: any) {
      dispatch(actions.updateUserFailed());
    }
  };

export const deleteUser =
  (user: IUser, accessToken: string | null) => async (dispatch: Dispatch) => {
    try {
      dispatch(actions.deleteUser());

      const res = await del(`${userAPIUrl}/${user._id}`, accessToken);

      if (res) {
        dispatch(actions.deleteUserSuccess());
      } else {
        dispatch(actions.deleteUserFailed());
      }
    } catch (error: any) {
      dispatch(actions.deleteUserFailed());
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(actions.logoutSuccess());
};
