import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, SliceAndReducersName } from "../../data/app.constant";
import { StorageService } from "../../services/storage.service";

const storageSvc = new StorageService();

const tokenSlice = createSlice({
  name: SliceAndReducersName.TOKEN,
  initialState: storageSvc.getItem(LocalStorageKeys.TOKEN),
  reducers: {
    setToken: (state, action) => {
      storageSvc.setItem(LocalStorageKeys.TOKEN, action.payload);
      // TODO: Need to remove this hard relaod check the routes.ts files login
      window.location.reload();
      return action.payload;
    },
    removeToken: (state) => {
      storageSvc.removeItem(LocalStorageKeys.TOKEN);
      // TODO: Need to remove this hard relaod check the routes.ts files login
      window.location.reload();
      return null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
