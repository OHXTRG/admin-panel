import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "../features/user.slice";
import ExerciseReducer from "../features/exercise.slice";

const rootReducer = combineReducers({
  user: UserReducer,
  exerciseState: ExerciseReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
