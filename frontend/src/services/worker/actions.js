import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../utils/api";

export const loadWorker = createAsyncThunk(
  "worker/loadWorker",
  async (workerId) => {
    return api.getWorkerInfo(workerId);
  }
);
