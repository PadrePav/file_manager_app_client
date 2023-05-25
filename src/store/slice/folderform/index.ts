import {createSlice} from "@reduxjs/toolkit";

interface IFolderId {
  folderId: string;
  isStatusUpdated: boolean;
}

const initialState: IFolderId = {
  folderId: '',
  isStatusUpdated: false,

};

export const folderSlice = createSlice({
  name: 'folderId',
  initialState,
  reducers: {
    setFolderId(state, action) {
      state.folderId = action.payload
    },
    setStatusUpdate(state, action) {
      state.isStatusUpdated = action.payload
    }
  }
})

export const {setFolderId, setStatusUpdate} = folderSlice.actions

export default folderSlice.reducer