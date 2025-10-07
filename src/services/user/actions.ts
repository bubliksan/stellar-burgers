import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './userSlice';

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => {
    updateUserApi(data);
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((user) => dispatch(setUser(user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (data: TRegisterData) => registerUserApi(data)
// );
