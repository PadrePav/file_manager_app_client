import {createSlice} from "@reduxjs/toolkit";
import {IAuthState} from "../../../common/types/auth";

const initialState: IAuthState = {
  user: {
    userName: ''
  },
  isLogged: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLogged = true
      console.log(action.payload)
    }
  }
})

export const {login} = authSlice.actions

export default authSlice.reducer