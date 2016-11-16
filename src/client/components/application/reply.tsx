import * as React from "react";
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { AppState } from '../../states/app';
import { bindActionCreators } from 'redux';
import { REPLY_TO_APPLICATION, ReplyToApplicationAction } from '../../../actions';

interface ReplyProps {
  appId?: number;
  authorUid?: number;
  appStatus?: number;
  actions?: {
    reply?: (message: string, status?: number) => ReplyToApplicationAction;
  };
}

const renderTextField = ({ data, input, label, meta: { touched, error } }) => {
  return (
    <TextField
      className="col-sm-12"
      floatingLabelText={data.label}
      multiLine={true}
      fullWidth={true}
      floatingLabelFixed={true}
      errorText={touched && error}
      rows={5}
      defaultValue={input.value}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      />
  );
};


const replyImpl: React.StatelessComponent<ReplyProps> = (props: ReplyProps) => {
  let textField;
  return (
    <div className="panel">
      <h2 className="panel__header">Reply</h2>
      <div className="panel__content">
        <TextField
          ref={(node) => textField = node}
          className="col-sm-12"
          floatingLabelText="Write your message here..."
          multiLine={true}
          fullWidth={true}
          floatingLabelFixed={true}
          rows={5}
          />
      </div>
      <button className="panel__button panel__button--action" onClick={() => {
        props.actions.reply(textField.input.refs.input.value, props.appStatus === 1 && props.authorUid !== window.app.user.uid ? 2 : undefined);
        textField.input.refs.input.value = "";
      } }>Reply</button>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const props: ReplyProps = {

  };
  return props;
};

const mapDispatchToProps = (dispatch: any, ownProps: ReplyProps) => {
  const props: ReplyProps = {
    actions: bindActionCreators({
      reply: (message: string, status?: number) => { 
        return {
          type: REPLY_TO_APPLICATION,
          payload: {
            reply: {
              appId: ownProps.appId,
              message,
              status
            }
          }
        };
      }
    }, dispatch)
  };
  return props;
};


export const ApplicationReplyComponent: React.ComponentClass<ReplyProps> = connect(mapStateToProps, mapDispatchToProps)(replyImpl);