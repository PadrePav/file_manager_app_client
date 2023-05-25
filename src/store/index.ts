import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import folderSlice from "./slice/folderform";

const store = configureStore({
  reducer: {
    auth: authSlice,
    folderId: folderSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store