import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { GET_BLOG_POSTS_REQUEST, GET_BLOG_POSTS_SUCCESS, Action, AnyAction, DELETE_BLOG_POST_REQUEST, DELETE_BLOG_POST_SUCCESS } from '../../actions';
import { AppState } from '../states/app';
import { Socket } from './helpers';


export const getBlogPosts: Epic<AnyAction, AppState> = action$ =>
  action$.ofType(GET_BLOG_POSTS_REQUEST)
    .mergeMap(action => Socket
      .emit({ event: 'plugins.ml.blog.getAllBlogPosts' })
      .map(posts => ({
        type: GET_BLOG_POSTS_SUCCESS,
        payload: {
          posts,
        },
      }))
      .catch(err => {
        console.log(err);
        return Observable.of(Action);
      }),
  );

export const deleteBlogPost: Epic<AnyAction, AppState> = action$ =>
  action$.ofType(DELETE_BLOG_POST_REQUEST)
    .mergeMap(action => Socket
      .emit({ event: 'plugins.ml.blog.deleteBlogPost', payload: action.payload })
      .map(posts => ({
        type: DELETE_BLOG_POST_SUCCESS,
        payload: action.payload,
      }))
      .catch(err => {
        console.log(err);
        return Observable.of(Action);
      }),
  );

