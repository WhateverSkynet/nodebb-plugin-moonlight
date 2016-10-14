import { Reducer } from "redux";
import { ApplicationState } from './../states/application';
import { ApplicationAction, Action, GET_QUESTIONS, QUESTION_CREATED, QUESTION_UPDATED } from './../../actions';
import { Question } from './../../models/application';


const questionReducer: Reducer<Question> = (state: Question = {}, action: ApplicationAction = Action) => {
  switch (action.type) {
    case QUESTION_UPDATED:
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
    case GET_QUESTIONS:
      return action.questions.map(x => questionReducer(x, action))
    case QUESTION_CREATED:
      return [...state, action.question];
    default:
      return state.map(x => questionReducer(x, action));
  }
};


export const applicationReducer: Reducer<ApplicationState> = (state: ApplicationState = {}, action: ApplicationAction = Action) => {
  switch (action.type) {

    default:
      return {
        questions: questionsReducer(state.questions, action)
      };
  }
}


