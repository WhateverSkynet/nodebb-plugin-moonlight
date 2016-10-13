import {blizzardReducer} from './blizzard';
import { AdminState } from '../../states/admin/admin';
import { combineReducers } from "redux";

export const adminReducer = combineReducers<AdminState>({
  blizzard: blizzardReducer
});

