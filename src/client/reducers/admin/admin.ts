import { combineReducers } from 'redux';

import { blizzardReducer } from './blizzard';
import { AdminState } from '../../states/admin/admin';
import { blogReducer } from './blog';

export const adminReducer = combineReducers<AdminState>({
  blizzard: blizzardReducer,
  blog: blogReducer,
});
