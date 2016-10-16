import { combineEpics } from 'redux-observable';
import { getQuestionsEpic, updateQuestion, getTemplateQuestionsEpic, updateTemplateQuestionsEpic } from './application';

export const appEpic = combineEpics(
  getQuestionsEpic,
  updateQuestion,
  getTemplateQuestionsEpic,
  updateTemplateQuestionsEpic
);