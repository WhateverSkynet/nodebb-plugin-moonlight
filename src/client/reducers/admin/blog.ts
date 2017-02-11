import { Reducer, combineReducers } from 'redux';
import { ApplicationState } from '../../states/application';
import { AdminAction, Action, ADMIN_SELECT_BLOG_POST, ADMIN_CREATE_BLOG_POST, ADMIN_SAVE_BLOG_POST_SUCCESS } from '../../../actions';
import { BlogSettingsState } from '../../states/admin/blog-settings';

const selectedId: Reducer<number> = (state: number = null, action: AdminAction = Action) => {
  switch (action.type) {
    case ADMIN_SELECT_BLOG_POST:
      return action.payload.id;
    case ADMIN_CREATE_BLOG_POST:
      return null;
    case ADMIN_SAVE_BLOG_POST_SUCCESS:
      const post = action.payload.post;
      return state !== post.id
        ? post.id
        : state;
    default:
      return state;
  }
};

export const reducers = {
  selectedId,
};

export const blogReducer = combineReducers<BlogSettingsState>(reducers);
