import { combineReducers } from 'redux';

import * as UUID from "uuid";
import { AjaxifyAction, ADMIN_CREATE_BLOG_POST, Action, AdminAction, GET_BLOG_POSTS_SUCCESS, BlogAction, ADMIN_SAVE_BLOG_POST_SUCCESS, AJAXIFY_BLOG } from '../../../actions';
import { ApplicationDbState, DbState } from '../../states/db';
import { BlogPostEntity } from '../../../models/blog';
import { State } from '../../states/state';
import { publicPath } from '../../util';

export const selectBlogPosts = (state: State) => {
  return state.db.blogPosts.allIds.map(x => state.db.blogPosts.byId[x]);
};
export const selectBlogPost = (state: State, id: number) => {
  return state.db.blogPosts.byId[id];
};

export const byId = (state: { [appId: number]: BlogPostEntity } = {}, action: BlogAction | AdminAction | AjaxifyAction = Action) => {
  switch (action.type) {
    case AJAXIFY_BLOG:
    case GET_BLOG_POSTS_SUCCESS:
      state = {};
      for (let post of action.payload.posts) {
        state[post.id] = post;
      }
      return state;
    case ADMIN_SAVE_BLOG_POST_SUCCESS:
      const post = action.payload.post;
      return Object.assign({}, state, { [post.id]: post });
    default:
      return state;
  }
};

export const allIds = (state: number[] = [], action: BlogAction | AdminAction | AjaxifyAction = Action) => {
  switch (action.type) {
    case AJAXIFY_BLOG:
    case GET_BLOG_POSTS_SUCCESS:
      return [...action.payload.posts.map(post => post.id)];
    case ADMIN_SAVE_BLOG_POST_SUCCESS:
      const post = action.payload.post;
      return state.indexOf(post.id) === -1
        ? [post.id, ...state]
        : state;
    default:
      return state;
  }
};

export const blogPostReducer = combineReducers<ApplicationDbState>({
  byId,
  allIds,
});

