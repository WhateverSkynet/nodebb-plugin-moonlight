import { combineReducers } from 'redux';

import { blizzardReducer } from './blizzard';
import { AdminState } from '../../states/admin/admin';
import { blogReducer } from './blog';

import discord from './discord';

export const adminReducer = combineReducers<AdminState>({
  blizzard: blizzardReducer,
  blog: blogReducer,
  discord,
});
