import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { GET_BLOG_POSTS_REQUEST, GET_BLOG_POSTS_SUCCESS, Action, AnyAction } from '../../actions';
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
        }
      }))
    // .catch(err => console.log(err))
    );




