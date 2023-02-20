import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import { getUserByToken } from '@/pages/api/api';


export const fetchUserByToken = createAsyncThunk(
  'user/fetchByToken',
  async (params: any, thunkAPI) => {
    const { token, callback } = params;
    const response = await getUserByToken(token)
    callback()
    return response.data
  }
)
interface initialState {
  user: IUser | null;
}

const initialState = {
  user: null,
} as initialState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      state.user = action.payload
    })
    return ({
      [HYDRATE]: (state: any, action: any) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    })
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: AppState) => state.user;

export default userSlice.reducer;
