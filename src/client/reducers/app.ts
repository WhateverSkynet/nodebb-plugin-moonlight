import { AppState } from '../states/app';
import { rosterReducer } from './roster';
import { combineReducers } from "redux";
import { applicationReducer } from './application';

export const appReducer = combineReducers<AppState>({
  data: (state = {}, action) => state,
  roster: rosterReducer,
  application: applicationReducer
});
