import { Reducer, combineReducers } from 'redux';
import { ApplicationState } from './../states/application';
import { ApplicationAction, Action, GET_QUESTIONS, QUESTION_CREATED, QUESTION_UPDATE_INITIATED, EDIT_QUESTION, QUESTION_LIST_UPDATED, QUESTION_UPDATE_SUCCESS, ADD_QUESTION_TO_TEMPLATE, REMOVE_QUESTION_FROM_TEMPLATE, MOVE_TEMPLATE_QUESTION_UP, MOVE_TEMPLATE_QUSTION_DOWN, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS, GET_APPLICATION_TEMPLATE_SUCCESS, APPLICATION_QUESTION_VALUE_CHANGED, SAVE_APPLICATION_SUCCESS } from './../../actions';
import { Question, ApplicationTemplate, ApplicationCharacter } from './../../models/application';

import * as UUID from "uuid";
import { AjaxifyAction, AJAXIFY_APPLICATION } from '../../actions';

const questionReducer: Reducer<Question> = (state: Question = {}, action: ApplicationAction = Action) => {
  switch (action.type) {
    case ADD_QUESTION_TO_TEMPLATE:
      return state.qid !== action.qid
        ? state
        : Object.assign({}, state, { active: true });
    case REMOVE_QUESTION_FROM_TEMPLATE:
      return state.qid !== action.qid
        ? state
        : Object.assign({}, state, { active: false });
    case QUESTION_UPDATE_SUCCESS:
      return state.qid !== action.question.qid
        ? state
        : Object.assign({}, action.question);
    default:
      return state;
  }
};

const questionsReducer: Reducer<Question[]> = (state: Question[] = [], action: ApplicationAction = Action) => {
  switch (action.type) {
    case QUESTION_UPDATE_SUCCESS:
      return action.question.deleted === 1 ? state.filter(q => q.qid !== action.question.qid) : state.map(x => questionReducer(x, action));
    case QUESTION_LIST_UPDATED:
      return action.questions.map(x => questionReducer(x, action));
    case ADD_QUESTION_TO_TEMPLATE:
      return state.map(x => questionReducer(x, action));
    case REMOVE_QUESTION_FROM_TEMPLATE:
      return state.map(x => questionReducer(x, action));
    case QUESTION_CREATED:
      return [...state, action.question];
    default:
      return state.map(x => questionReducer(x, action));
  }
};

const editQuestionReducer: Reducer<number> = (state: number = -1, action: ApplicationAction = Action) => {
  switch (action.type) {
    case EDIT_QUESTION:
      return action.index;
    case QUESTION_UPDATE_INITIATED:
      return -1;
    default:
      return state;
  }
};


const templateQuestionsReducer: Reducer<number[]> = (state: number[] = [], action: ApplicationAction = Action) => {
  let index;
  switch (action.type) {
    // case GET_TQUESTIONS:
    //   return action.questions.map(x => questionReducer(x, action))
    case ADD_QUESTION_TO_TEMPLATE:
      index = state.indexOf(action.qid);
      if (index !== -1) {
        return state;
      }
      return [...state, action.qid];
    case REMOVE_QUESTION_FROM_TEMPLATE:
      index = state.indexOf(action.qid);
      return [...state.slice(0, index),
      ...state.slice(index + 1)];
    case MOVE_TEMPLATE_QUESTION_UP:
      index = state.indexOf(action.qid);
      if (index === 0) {
        return state;
      }
      return [
        ...state.slice(0, index - 1),
        action.qid,
        ...state.slice(index - 1, index),
        ...state.slice(index + 1)
      ];
    case MOVE_TEMPLATE_QUSTION_DOWN:
      index = state.indexOf(action.qid);
      if (index === state.length - 1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, index + 2),
        action.qid,
        ...state.slice(index + 2)
      ];
    case GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS:
      return [...action.qids];
    default:
      return state;
  }
};
const appQuestionReducer: Reducer<Question> = (state: Question = {}, action: ApplicationAction = Action) => {
  switch (action.type) {
    case APPLICATION_QUESTION_VALUE_CHANGED:
      if (action.qid === state.qid) {
        return Object.assign({}, state, { value: action.newValue });
      }
      return state;
    default:
      return state;
  }
};

const appQuestionsReducer: Reducer<Question[]> = (state: Question[] = [], action: ApplicationAction = Action) => {

  switch (action.type) {
    case GET_APPLICATION_TEMPLATE_SUCCESS:
      return [...action.template.questions];
    default:
      return state.map(x => appQuestionReducer(x, action));
  }
};

const appCharactersReducer: Reducer<ApplicationCharacter[]> = (state: ApplicationCharacter[] = [], action: ApplicationAction = Action) => {

  switch (action.type) {
    case GET_APPLICATION_TEMPLATE_SUCCESS:
      return [...action.template.characters];

    default:
      return state;
  }
};

const appIdReducer: Reducer<number> = (state: number = 0, action: ApplicationAction = Action) => {
  switch (action.type) {
    case SAVE_APPLICATION_SUCCESS:
      return action.template.appId;
    case GET_APPLICATION_TEMPLATE_SUCCESS:
      return action.template.appId;
    default:
      return state;
  }
};

const statusReducer: Reducer<number> = (state: number = 0, action: ApplicationAction = Action) => {
  switch (action.type) {
    case SAVE_APPLICATION_SUCCESS:
      return action.template.status;
    default:
      return state;
  }
};

const actionsReducer = (state: string[] = [], action: AjaxifyAction = Action) => {
  switch (action.type) {
    case AJAXIFY_APPLICATION:
      return [...action.payload.actions];
    default:
      return state;
  }

};

const applicationTemplateReducer = combineReducers<ApplicationTemplate>({
  appId: appIdReducer,
  questions: appQuestionsReducer,
  characters: appCharactersReducer,
  status: statusReducer,
});

export const applicationReducer = combineReducers<ApplicationState>({
  questions: questionsReducer,
  templateQuestions: templateQuestionsReducer,
  editQuestionIndex: editQuestionReducer,
  template: applicationTemplateReducer,
  actions: actionsReducer,
});
