import * as React from "react";
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { REPLY_TO_APPLICATION, ReplyToApplicationAction } from '../../../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { State } from '../../states/state';

const actionTexts = {
  SCHEDULE_INTERVIEW: "Schedule Interview",
  ACCEPT: "Accept",
  DECLINE: "Decline",
  WITHDRAW: "Withdraw Application"
}

interface ReplyProps {
  appId?: number;
  authorUid?: number;
  appStatus?: number;
  statuses?: string[];
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


class ReplyImpl extends React.Component<ReplyProps, { action: string, message: string }> {
  state = {
    action: null,
    message: ""
  };
  handleActionChange = (event, index, action) => this.setState(Object.assign({}, this.state, { action }));
  handleMessageChange = (event) => this.setState(Object.assign({}, this.state, { message: event.target.value }));
  saveReply = () => {
    let status;
    const props = this.props;
    switch (this.state.action) {
      case "WITHDRAW":
        status = 3;
        break;
      case "SCHEDULE_INTERVIEW":
        status = 4;
        break;
      case "ACCEPT":
        status = 5;
        break;
      case "DECLINE":
        status = 6;
        break;
      default:
        if (props.appStatus === 1 && props.authorUid !== window.app.user.uid) {
          status = 2;
        }
    }

    props.actions.reply(this.state.message, status);
    this.setState({
      action: null,
      message: ""
    });
  }
  render() {
    const props = this.props;
    return (
      <div className="panel">
        <h2 className="panel__header">Reply</h2>
        <div className="panel__content">
          <TextField
            floatingLabelText="Write your message here..."
            multiLine={true}
            fullWidth={true}
            floatingLabelFixed={true}
            value={this.state.message}
            onChange={this.handleMessageChange}
            rows={5}
            />
          {
            props.statuses.length
              ? (
                <SelectField
                  floatingLabelStyle={{
                    color: "#007ABE",
                    fontWeight: 400
                  }}
                  value={this.state.action}
                  onChange={this.handleActionChange}
                  floatingLabelText="Action"
                  fullWidth={true}
                  >
                  {
                    props.statuses.map((x, i) => <MenuItem key={x} value={x} primaryText={actionTexts[x]} />)
                  }
                </SelectField>
              )
              : ""
          }
        </div>
        <button
          className="panel__button panel__button--action"
          disabled={!this.state.message}
          onClick={this.saveReply} >Reply</button>
      </div>
    );
  }
};

const mapStateToProps = (state: State) => {
  const props: ReplyProps = {
    statuses: state.app.application.actions.filter(action => action !== "REPLY")
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


export const ApplicationReplyComponent: React.ComponentClass<ReplyProps> = connect(mapStateToProps, mapDispatchToProps)(ReplyImpl);