import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../states/state';
import { bindActionCreators } from 'redux';

import { BlogPostEntity } from '../../../models/blog';
import { selectBlogPosts } from '../../reducers/db/blog-post';
import { Link } from 'react-router';
import { ADMIN_SELECT_BLOG_POST, AdminSelectBlogPostAction, ADMIN_CREATE_BLOG_POST, AdminCreateBlogPostAction, GET_BLOG_POSTS_REQUEST } from '../../../actions';
import { store } from '../../index';

const create = () => {

};

interface BlogListProps {
  posts?: BlogPostEntity[];
  actions?: {
    select: (id: number) => AdminSelectBlogPostAction;
    create: () => AdminCreateBlogPostAction;
  };
}
class BlogPostListContainer extends React.Component<BlogListProps, void> {

  componentDidMount() {
    store.dispatch({
      type: GET_BLOG_POSTS_REQUEST,
    });
  }

  render() {
    return (
      <BlogList {...this.props} />
    )
  }
}

const BlogList = (props: BlogListProps) => {
  const { actions } = props;
  return (
    <div className='section'>
      <div className='panel'>
        <h2 className='panel__header'>Posts</h2>
        <div className='panel__content'>
          <table className='table'>
            <thead>
              <tr className='row'>
                <th className='col-xs-2'>Id</th>
                <th className='col-xs-12'>Title</th>
                <th className='col-xs-6'>Author</th>
                <th className='col-xs-4'>Published</th>
              </tr>
            </thead>
            <tbody style={
              {
                // backgroundColor: "#cce4f2",
              }
            }>
              {
                props.posts.map((post, i) =>
                  <tr key={post.id} className='row clickable' style={
                    {
                      background: i % 2 === 0 ? '#cce4f2' : 'transparent',

                    }
                  } onClick={() => props.actions.select(post.id)}>
                    <td className='col-xs-2'>{post.id}</td>
                    <td className='col-xs-12'>{post.title}</td>
                    <td className='col-xs-16'></td>
                    <td className='col-xs-4'>{post.date}</td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
        <button className='panel__button panel__button--action' onClick={() => actions.create()}>Create New Post</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const props: BlogListProps = {
    posts: selectBlogPosts(state),
  };
  return props;
};

const mapDispatchToProps = (dispatch: any, ownProps: BlogListProps) => {
  const props: BlogListProps = {
    actions: bindActionCreators({
      select: (id: number) => {
        return {
          type: ADMIN_SELECT_BLOG_POST,
          payload: {
            id,
          },
        };
      },
      create: () => {
        return {
          type: ADMIN_CREATE_BLOG_POST,
        };
      }
    }, dispatch),
  };
  return props;
};

export const BlogListContainer = connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);
