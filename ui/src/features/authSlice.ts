// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User } from '../interfaces/user.interface';

// export interface AuthSlice {
//   userId?: number;
//   email?: string;
// }

// const initialState: AuthSlice = {};

// export const authSlice = createSlice({
//   name: 'setAuthUser',
//   initialState,
//   reducers: {
//     setAuthUser: (state, action: PayloadAction<User>) => {
//       const { id, email } = action.payload;
//       state.userId = id;
//       state.email = email;
//     },
//   },
// });

// Action creators are generated for each case reducer function
// export const { setAuthUser } = authSlice.actions;

// export default authSlice.reducer;
