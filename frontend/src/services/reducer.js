import { combineReducers } from "redux";

import { reducer as userReducer } from "./user/reducer";
import { reducer as usersReducer } from "./users/reducer";
import { reducer as workerReducer } from "./worker/reducer";
import { reducer as projectsReducer } from "./projects/reducer";
import { reducer as searchReducer } from "./search/reducer";
import { reducer as sidebarReducer } from "./sidebar/reducer";

export const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  worker: workerReducer,
  projects: projectsReducer,
  search: searchReducer,
  sidebar: sidebarReducer,
});
