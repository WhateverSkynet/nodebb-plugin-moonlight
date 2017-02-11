
import * as React from 'react';
import { publicPath } from '../../util';

import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { State } from '../../states/state';
import { selectBlogPost } from '../../reducers/db/blog-post';
import { BlogPostEntity } from '../../../models/blog';
import DatePicker from 'material-ui/DatePicker';
import { Socket } from '../../epics/helpers';
import { store } from './../../index';
import { ADMIN_SAVE_BLOG_POST_SUCCESS } from '../../../actions';

const onSubmit = () => {
  const state = store.getState();
  const formValue = getFormValues<BlogPostEntity, State>('blogPost')(state);
  const oldData = selectBlogPost(state, state.admin.blog.selectedId);
  const post = Object.assign({}, oldData, formValue);
  return Socket.emit({ event: 'plugins.ml.blog.saveBlogPost', payload: { post } }).toPromise()
    .then(post => {
      store.dispatch({
        type: ADMIN_SAVE_BLOG_POST_SUCCESS,
        payload: {
          post,
        }
      })
     return Promise.resolve();
    });
};


const formConfig = {
  form: 'blogPost',
  onSubmit,
  enableReinitialize: true,
};

const renderTextField = ({ data, input, label, multiLine = false, meta: { touched, error } }) => {
  return (
    <TextField
      className="mnl-text-field"
      floatingLabelText={data.label}
      floatingLabelStyle={{
        color: "#007ABE",
        fontWeight: 400
      }}
      fullWidth={true}
      floatingLabelFixed={true}
      multiLine={multiLine}
      errorText={touched && error}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
    />
  );
};

interface BlogPostFormProps {
  post: BlogPostEntity;
  initialValues: BlogPostEntity;
}

class Form extends React.Component<BlogPostFormProps, void> {
  render() {
    const { post } = this.props;
    return (
      <div>
        <div className='panel'>
          <div className='panel__header'>Post</div>
          <div className='panel__content'>
            <Field name={`title`} component={renderTextField} data={{ label: "Title" }} />
            <Field name={`date`} component={renderTextField} data={{ label: "Date" }} />
            <Field name={`imageUrl`} component={renderTextField} data={{ label: "Image Url" }} />
            <Field name={`imageAlt`} component={renderTextField} data={{ label: "Image Alt" }} />
            <Field name={`content`} component={renderTextField} multiLine={true} data={{ label: "Content" }} />
          </div>
          <button className='panel__button panel__button--action' onClick={() => onSubmit()}>Save</button>
        </div>
        {
          post ? (
            <div className='panel'>
              <img className="panel__image" src={post.imageUrl} alt={post.imageAlt}></img>
              <div className='panel__heading'>{post.title}</div>
              <div className='panel__content panel__content--dark'>
                {
                  post.content
                    ? post.content.split('\n')
                      .map((paragraph, i) => (<p key={i}>{paragraph}</p>))
                    : ''
                }
              </div>
              <div className='panel__footer'>
                <div className='panel__text'>{post.date}</div>
              </div>
            </div>
          )
            : ""
        }
      </div>
    );
  }
};

const mapStateToProps = (state: State) => {
  const props: BlogPostFormProps = {
    post: getFormValues<BlogPostEntity, State>('blogPost')(state),
    initialValues: selectBlogPost(state, state.admin.blog.selectedId),
  };
  return props;
};

export const BlogPostForm = connect(mapStateToProps)(reduxForm(formConfig)(Form));
