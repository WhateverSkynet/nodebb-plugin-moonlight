import { store } from './../index';
import { QUESTION_CREATED, QUESTION_UPDATED } from './../../actions';

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
      type: QUESTION_UPDATED,
      question
    };
    store.dispatch(action);
  });

};

export const ApplicationSocket = {
  register
};