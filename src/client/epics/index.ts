import { combineEpics } from 'redux-observable';
import { getQuestionsEpic, updateQuestion, getTemplateQuestionsEpic, updateTemplateQuestionsEpic, getApplicationTemplateEpic, saveApplication, replyToApplication, deleteApplication } from './application';
import { getBlogPosts } from './blog';

export const appEpic = combineEpics(
  getQuestionsEpic,
  updateQuestion,
  getTemplateQuestionsEpic,
  updateTemplateQuestionsEpic,
  getApplicationTemplateEpic,
  saveApplication,
  deleteApplication,
  replyToApplication,
  getBlogPosts,
);