import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  login,
  logout,
  registerUser,
  updateUser
} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: undefined
};

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('rejected');
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkUserAuth.fulfilled, () => {})
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setIsAuthChecked, setUser } = userSlice.actions;
