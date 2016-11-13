import { Reducer, combineReducers } from 'redux';
import { ApplicationState } from './../states/application';
import { ApplicationAction, Action, GET_QUESTIONS, QUESTION_CREATED, QUESTION_UPDATE_INITIATED, EDIT_QUESTION, QUESTION_LIST_UPDATED, QUESTION_UPDATE_SUCCESS, ADD_QUESTION_TO_TEMPLATE, REMOVE_QUESTION_FROM_TEMPLATE, MOVE_TEMPLATE_QUESTION_UP, MOVE_TEMPLATE_QUSTION_DOWN, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS, GET_APPLICATION_TEMPLATE_SUCCESS, APPLICATION_QUESTION_VALUE_CHANGED, SAVE_APPLICATION_SUCCESS } from './../../actions';
import { Question, ApplicationTemplate, ApplicationCharacter } from './../../models/application';

import * as UUID from "uuid";
import { ApplicationValidationErrors, ValidationError, PropertyValidationErrors, ERROR } from '../../models/application';

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


// const appCharacterValidationReducer: Reducer<PropertyValidationErrors> = (state: PropertyValidationErrors = {}, action: ApplicationAction = Action) => {

//   switch (action.type) {
//     case APPLICATION_CHARACTER_DATA_CHANGED:
//       state = Object.assign({}, state);
//       state[action.characterGuid] = validateCharacter(action.changed);
//       return state;
//     case SELECT_CHARACTER_CLASS:
//       state = Object.assign({}, state);
//       state[action.characterGuid] = validateCharacter({ class: action.className });
//       return state;
//     case GET_APPLICATION_TEMPLATE_SUCCESS:
//       state = {};
//       action.template.characters.forEach((c, i) => {
//         state[c.guid] = validateCharacter(c, i == 0);
//       });
//       return state;
//     case REMOVE_APPLICATION_CHARACTER:
//       let newState = {};
//       for (let key in state) {
//         if (key !== action.guid) {
//           newState[key] = state[key];
//         }
//       }
//       return newState;
//     default:
//       return state;
//   }
// };

// const appQuestionValidationReducer: Reducer<number[]> = (state: number[] = [], action: ApplicationAction = Action) => {

//   switch (action.type) {
//     case APPLICATION_QUESTION_VALUE_CHANGED:
//       const errorIndex = state.indexOf(action.qid);
//       const hasError = !!action.newValue;
//       if (errorIndex !== -1 && !hasError) {
//         // error => no error
//         return [
//             ...state.slice(0, errorIndex),
//             ...state.slice(errorIndex + 1)
//         ];
//       } else if (errorIndex === -1 && hasError) {
//         // no error => error 
//         [...state, action.qid];
//       }

//       return state;
//     case GET_APPLICATION_TEMPLATE_SUCCESS:
//       return action.template.questions
//         .filter(x => !x.value)
//         .map(x => x.qid);
//     default:
//       return state;
//   }
// };
// const applicationTemplateReducer: Reducer<ApplicationTemplate> = (state: ApplicationTemplate = {}, action: ApplicationAction = Action) => {

//   switch (action.type) {

//     default:
//       return {
//         questions: appQuestionsReducer(state.questions, action)
//       }
//   }
// };
// const applicationValidationReducer = combineReducers<ApplicationValidationErrors>({
//   questions: appQuestionValidationReducer,
//   characters: appCharacterValidationReducer
// });


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
  // validationErrors: applicationValidationReducer
});
