import { AppState } from '../states/app';
import { rosterReducer } from './roster';
import { combineReducers } from "redux";

export const appReducer = combineReducers<AppState>({
  data: (state = {}, action) => state,
  roster: rosterReducer
});
