import { AppState } from '../states/app';
import { rosterReducer } from './roster';
import { combineReducers } from "redux";
import { applicationReducer } from './application';
import applicationList from './application-list.reducer';

export const appReducer = combineReducers<AppState>({
  data: (state = {}, action) => state,
  roster: rosterReducer,
  application: applicationReducer,
  applicationList,
});
