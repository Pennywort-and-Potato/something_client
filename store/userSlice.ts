import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

interface initialState {
  user: IUser | null;
}

const initialState: initialState = {
  user: null,
};

const extraReducers: any = {
  [HYDRATE]: (state: any, action: any) => {
    return {
      ...state,
      ...action.payload,
    };
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    extraReducers,
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: AppState) => state.user;

export default userSlice.reducer;
