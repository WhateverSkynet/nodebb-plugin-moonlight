
import * as React from 'react';
import { publicPath } from '../../util';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';

import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { State } from '../../states/state';
import { selectBlogPost } from '../../reducers/db/blog-post';
import { BlogPostEntity } from '../../../models/blog';
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

const styles = {
  checkbox: {
    marginBottom: 16,
    width: "auto",
    display: "inline-block",
    marginRight: 16
  },
};

const formConfig = {
  form: 'blogPost',
  onSubmit,
  enableReinitialize: true,
};

const renderTextField = ({ data, input, multiLine = false, meta: { touched, error } }) => {
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

const renderToggle = ({ data, input, meta: { touched, error } }) => {
  return (
    <Toggle
      label={data.label}
      labelStyle={{
        color: "#007ABE",
        fontWeight: 400
      }}
      defaultToggled={input.value || false}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
    />
  );
};
const renderDatePicker = ({ data, input, meta: { touched, error } }) => {
  const date = input.value ? new Date(input.value) : null;
  return (
    <DatePicker
      className="mnl-text-field"
      floatingLabelText={data.label}
      floatingLabelStyle={{
        color: "#007ABE",
        fontWeight: 400
      }}
      fullWidth={true}
      container="inline"
      mode="landscape"
      value={date}
      onChange={(event, date) => { input.onChange(date.getTime()) }}
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
    const date = post && post.date ? new Date(post.date).toString() : "";
    return (
      <div>
        <div className='panel'>
          <div className='panel__header'>Post</div>
          <div className='panel__content'>
            <Field name={`title`} component={renderTextField} data={{ label: "Title" }} />
            <Field name={`date`} component={renderDatePicker} data={{ label: "Date" }} />
            <Field name={`imageUrl`} component={renderTextField} data={{ label: "Image Url" }} />
            <Field name={`imageAlt`} component={renderTextField} data={{ label: "Image Alt" }} />
            <Field name={`content`} component={renderTextField} multiLine={true} data={{ label: "Content" }} />
            <Field name={`published`} component={renderToggle} data={{ label: "Published" }} />
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
                <span className='panel__text' title={date}>{date ? window.jQuery.timeago(post.date) : ''}</span>
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
