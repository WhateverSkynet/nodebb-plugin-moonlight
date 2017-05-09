import * as React from "react";
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { AppState } from '../../states/app';
import { REPLY_TO_APPLICATION, ReplyToApplicationAction } from '../../../actions';
import { ApplicationReply } from '../../../models/application';



const MessageListItem = ({ message }: { message: ApplicationReply }) => {
  const timestamp = message.timestamp || Date.now();
  const timeago = window.utils.toISOString(timestamp);
  const date = new Date(timestamp).toString();

  return (
    <div className='message__container'>
      <div className='message__author' data-author={message.isApplicant ? 'applicant' : 'officer'}>{message.author}</div>
      <span className='message__timestamp' title={date}>{window.jQuery.timeago(timeago)}</span>
      {
        message && message.message
          ? message.message.split('\n').map((text, i) => (
            < p className='message__text' key={i} > {text}</p>
          ))
          : <p className='message__text'></p>
      }
    </div>
  );
};

interface ReplyListProps {
  authorId?: number;
  messages?: ApplicationReply[];
};


export const MessageList: React.StatelessComponent<ReplyListProps> = (props: ReplyListProps) => {
  let textField;
  return (
    <div>
      <ul>
        {
          props.messages.map(reply => (
            <li key={reply.id}><MessageListItem message={reply} /></li>
          ))
        }
      </ul>

    </div>
  );
};

