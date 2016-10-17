import { Reducer, combineReducers } from 'redux';
import { ApplicationState } from './../states/application';
import { ApplicationAction, Action, GET_QUESTIONS, QUESTION_CREATED, QUESTION_UPDATE_INITIATED, EDIT_QUESTION, QUESTION_LIST_UPDATED, QUESTION_UPDATE_SUCCESS, ADD_QUESTION_TO_TEMPLATE, REMOVE_QUESTION_FROM_TEMPLATE, MOVE_TEMPLATE_QUESTION_UP, MOVE_TEMPLATE_QUSTION_DOWN, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS, GET_APPLICATION_TEMPLATE_SUCCESS, APPLICATION_QUESTION_VALUE_CHANGED, SAVE_APPLICATION_SUCCESS, ADD_APPLICATION_CHARACTER, REMOVE_APPLICATION_CHARACTER } from './../../actions';
import { Question, Application, ApplicationTemplate, ApplicationCharacter } from './../../models/application';

import * as UUID from "uuid";

const questionReducer: Reducer<Question> = (state: Question = {}, action: ApplicationAction = Action) => {
  switch (action.type) {
    case QUESTION_UPDATE_SUCCESS:
      return state.qid !== action.question.qid
        ? state
        : {
          qid: action.question.qid,
          changed: action.question.changed,
          active: action.question.active,
          deleted: action.question.deleted,
          text: action.question.text,
        };
    default:
      return state;
  }
};

const questionsReducer: Reducer<Question[]> = (state: Question[] = [], action: ApplicationAction = Action) => {
  switch (action.type) {
    case QUESTION_LIST_UPDATED:
      return action.questions.map(x => questionReducer(x, action))
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
      index = state.indexOf(action.question);
      if (index !== -1) {
        return state;
      }
      return [...state, action.question];
    case REMOVE_QUESTION_FROM_TEMPLATE:
      index = state.indexOf(action.question);
      return [...state.slice(0, index),
      ...state.slice(index + 1)];
    case MOVE_TEMPLATE_QUESTION_UP:
      index = state.indexOf(action.question);
      if (index === 0) {
        return state;
      }
      return [
        ...state.slice(0, index - 1),
        action.question,
        ...state.slice(index - 1, index),
        ...state.slice(index + 1)
      ];
    case MOVE_TEMPLATE_QUSTION_DOWN:
      index = state.indexOf(action.question);
      if (index === state.length - 1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, index + 2),
        action.question,
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
        state = Object.assign({}, state);
        state.value = action.newValue;
      }
      return state
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
const appCharacterReducer: Reducer<ApplicationCharacter> = (state: ApplicationCharacter = {}, action: ApplicationAction = Action) => {

  switch (action.type) {
    default:
      return state;//.map(x => appQuestionReducer(x, action));
  }
};
const appCharactersReducer: Reducer<ApplicationCharacter[]> = (state: ApplicationCharacter[] = [], action: ApplicationAction = Action) => {

  switch (action.type) {
     case GET_APPLICATION_TEMPLATE_SUCCESS:
      return [...action.template.characters];
    case ADD_APPLICATION_CHARACTER: 
      return [...state, {guid: UUID.v4()}];
    case REMOVE_APPLICATION_CHARACTER: 
      for (let i = 0; i < state.length; i++) {
        if (state[i].guid == action.guid) {
          return [
            ...state.slice(0, i),
            ...state.slice(i +1)
            ];
        }
      }
      return state;
    default:
      return state.map(x => appCharacterReducer(x, action));
  }
};

const appIdReducer: Reducer<number> = (state: number = 0, action: ApplicationAction = Action) => {
  switch (action.type) {
    case SAVE_APPLICATION_SUCCESS:
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
}

// const applicationTemplateReducer: Reducer<ApplicationTemplate> = (state: ApplicationTemplate = {}, action: ApplicationAction = Action) => {

//   switch (action.type) {

//     default:
//       return {
//         questions: appQuestionsReducer(state.questions, action)
//       }
//   }
// };
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
  template: applicationTemplateReducer
});
