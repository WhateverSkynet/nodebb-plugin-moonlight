import { store } from './../index';
import { QUESTION_CREATED, QUESTION_UPDATE_SUCCESS, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS } from './../../actions';
import { Action } from '../../actions';

const register = () => {
  window.socket.on("event:mnl.application.question.created", (question: any) => {
    const action = {
      type: QUESTION_CREATED,
      question
    };
    store.dispatch(action);
  });

  window.socket.on("event:mnl.application.question.updated", (question: any) => {
    const action = {
      type: QUESTION_UPDATE_SUCCESS,
      question
    };
    store.dispatch(action);
  });

  window.socket.on("event:mnl.application.template.updated", (data: any) => {
    const action = {
      type: GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS,
      qids: data
    };
    store.dispatch(action);
  });

  window.socket.on("event:mnl.action", ({action}: { action: Action }) => {
    if (action) {
      store.dispatch(action);
    }
  });

};

export const ApplicationSocket = {
  register
};