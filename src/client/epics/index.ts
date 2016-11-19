import { combineEpics } from 'redux-observable';
import { getQuestionsEpic, updateQuestion, getTemplateQuestionsEpic, updateTemplateQuestionsEpic, getApplicationTemplateEpic, saveApplication, replyToApplication, deleteApplication } from './application';

export const appEpic = combineEpics(
  getQuestionsEpic,
  updateQuestion,
  getTemplateQuestionsEpic,
  updateTemplateQuestionsEpic,
  getApplicationTemplateEpic,
  saveApplication,
  deleteApplication,
  replyToApplication
);