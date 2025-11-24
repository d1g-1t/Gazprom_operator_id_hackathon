import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../utils/api";

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  return api.getUsersInfo();
});
