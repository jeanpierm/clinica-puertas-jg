import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken?: string;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    accessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    loggedOut: (state) => {
      state.accessToken = '';
      localStorage.clear();
    },
  },
});

export const { accessToken, loggedOut } = authSlice.actions;
