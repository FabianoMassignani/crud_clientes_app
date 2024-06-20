import axios from 'axios';
import { userAPIUrl, authAPIUrl } from '../constants/urls';
import * as actions from './Auth.actions';
import { Dispatch } from 'redux';

export const loadUser = () => async (dispatch: Dispatch) => {
  const userJson = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userJson) as IUser;

  try {
    if (user) {
      dispatch(actions.userLoaded(user));
    }

    return;
  } catch (error) {
    return;
  }
};

export const loadAllUsers =
  (accessToken: string | null) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(`${userAPIUrl}/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(actions.loadAllUsers());

      if (res) {
        dispatch(actions.loadAllUsersSuccess(res.data.users));
      }

      dispatch(actions.loadAllUsersFailed());
    } catch (error: any) {
      dispatch(actions.loadAllUsersFailed());
    }
  };

export const login = (data: ReqLogin) => async (dispatch: Dispatch) => {
  const { email, password } = data;

  try {
    dispatch(actions.login());

    const response = await axios.post(`${authAPIUrl}/signIn`, {
      email,
      password,
    });

    const user = response.data;

    if (user.accessToken) {
      dispatch(actions.loginSuccess(user));
    }

    dispatch(actions.loginFailed());
  } catch (error: any) {
    dispatch(actions.loginFailed());
  }
};

export const register =
  (data: ReqRegister, navigate: (path: string) => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(actions.register());

      const res = await axios.post(`${userAPIUrl}/register`, {
        ...data,
      });

      if (res) {
        dispatch(actions.registerSuccess(res.data.user));
        navigate('/login');
      }

      dispatch(actions.registerFailed());
    } catch (error: any) {
      dispatch(actions.registerFailed());
    }
  };

export const updateUser =
  (data: ReqUpdateUser, handleOk: () => void) => async (dispatch: Dispatch) => {
    try {
      dispatch(actions.updateUser());

      const res = await axios.put(`${userAPIUrl}`, {
        ...data,
      });

      if (res) {
        dispatch(actions.updateUserSuccess(res.data));
        handleOk();
      }

      dispatch(actions.updateUserFailed());
    } catch (error: any) {
      dispatch(actions.updateUserFailed());
    }
  };

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.deleteUser());

    const res = await axios.delete(`${userAPIUrl}/${id}`);

    if (res) {
      dispatch(actions.deleteUserSuccess());
    }

    dispatch(actions.deleteUserFailed());
  } catch (error: any) {
    dispatch(actions.deleteUserFailed());
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(actions.logoutSuccess());
};
