import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../utils/api";

export const loadProjects = createAsyncThunk(
  "projects/loadProjects",
  async () => {
    return api.getProjectsInfo();
  }
);
