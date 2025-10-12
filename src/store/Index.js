import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "../features/user.slice";

const rootReducer = combineReducers({
  user: UserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
