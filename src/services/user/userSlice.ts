import { Action, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  login,
  logout,
  /*, registerUser*/
  updateUser
} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

// interface RejectedAction extends Action {
//   error: Error;
// }

// function isRejectedAction(action: Action): action is RejectedAction {
//   return action.type.endsWith('rejected');
// }

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
      //   .addCase(registerUser.fulfilled, (state, action) => {
      //     state.user = action.payload.user;
      //     state.isAuthChecked = true;
      //   })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkUserAuth.fulfilled, () => {})
      .addCase(updateUser.fulfilled, () => {
        console.log('Updated');
      });
    //   .addMatcher(isRejectedAction, (state, action) => {
    //     state
    //   })
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setIsAuthChecked, setUser } = userSlice.actions;
