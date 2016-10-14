import * as actions from "../../actions";
import { store } from "../index";
import { Application, Question } from './../../models/application';
import { GET_QUESTIONS } from './../../actions';


const getQuestions = () => {
  window.socket.emit('plugins.ml.application.getQuestions', {}, (err, data) => {
    const action = {
      type: GET_QUESTIONS,
      questions: data
    };
    store.dispatch(action);
  });
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
  updateQuestion
};