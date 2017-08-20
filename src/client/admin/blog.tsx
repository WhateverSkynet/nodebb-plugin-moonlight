import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../states/state';
import { bindActionCreators } from 'redux';

import { BlogPostEntity } from '../../models/blog';
import { selectBlogPosts } from '../reducers/db/blog-post';

import { BlogListContainer } from './blog/list';
import { BlogPostForm } from './blog/form';

const create = () => {

};

interface AppListProps {
  posts?: BlogPostEntity[];
}

const Blog = (props: AppListProps) => {
  return (
    <div className='section'>
      <div className='row'>
        <div className='col-md-8'>
          <BlogPostForm />
        </div>
        <div className='col-md-4'>
          <BlogListContainer />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const props: AppListProps = {
    posts: selectBlogPosts(state),
  };
  return props;
};


export const BlogContainer = connect(mapStateToProps)(Blog);
