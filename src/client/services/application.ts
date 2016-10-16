import * as actions from "../../actions";
import { store } from "../index";
import { Application, Question } from './../../models/application';
import { GET_QUESTIONS, GET_APPLICATION_QUESTIONS_INIT } from './../../actions';


const getQuestions = () => {
  const action = {
    type: GET_QUESTIONS
  };
  store.dispatch(action);
};

const getTemplateQuestions = () => {
  const action = {
    type: GET_APPLICATION_QUESTIONS_INIT
  };
  store.dispatch(action);
};


const createQuestion = (text: string, next: (err, data) => void) => {
  window.socket.emit('plugins.ml.application.createQuestion', {
    text
  }, next);
};

const updateQuestion = (question: Question, next: (err, data) => void) => {
  window.socket.emit('plugins.ml.application.updateQuestion', question, next);
};

export const ApplicationService = {
  getQuestions,
  createQuestion,
  updateQuestion,
  getTemplateQuestions
};