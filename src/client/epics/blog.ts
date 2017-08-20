import { Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { GET_BLOG_POSTS_REQUEST, GET_BLOG_POSTS_SUCCESS, Action, DELETE_BLOG_POST_REQUEST, DELETE_BLOG_POST_SUCCESS, BlogAction, DeleteBlogPostRequestAction } from '../../actions';
import { AppState } from '../states/app';
import { Socket } from './helpers';


export const getBlogPosts: Epic<BlogAction, AppState> = action$ =>
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

export const deleteBlogPost: Epic<BlogAction, AppState> = action$ =>
  action$.ofType(DELETE_BLOG_POST_REQUEST)
    .mergeMap((action: DeleteBlogPostRequestAction) => Socket
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

