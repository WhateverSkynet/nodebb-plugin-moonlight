import { AjaxifyState } from '../states/ajaxify';
import { Question } from '../../models/application';
import { RosterCharacter } from '../../models/wow';

import { Reducer } from "redux";
import { AJAXIFY_NEW_APPLICATION, AJAXIFY_ROSTER, AJAXIFY_RECRUITMENT, AJAXIFY_CHANGE_RECRUITMENT_STATUS, AjaxifyAction, Action } from '../../actions';

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const defaultState = {
  roster: [],
  recruitment: [],
  questions: []
}

export const ajaxifyReducer = (state: AjaxifyState = defaultState, action: AjaxifyAction = Action) => {
  let newState: AjaxifyState;
  switch (action.type) {
    case AJAXIFY_ROSTER:
       newState = {
        recruitment: state.recruitment,
        roster: state.roster
      };
      newState.roster = action.characters;
      return newState;
    case AJAXIFY_RECRUITMENT:
       newState = {
        questions: state.questions,
        roster: state.roster
      };
      newState.recruitment = action.classes;
      return newState;
    case AJAXIFY_NEW_APPLICATION:
       newState = {
        recruitment: state.recruitment,
        roster: state.roster
      };
      newState.questions = action.application.questions;
      return newState;
    case AJAXIFY_CHANGE_RECRUITMENT_STATUS:
      newState = {
        questions: state.questions,
        roster: state.roster
      };
      newState.recruitment = state.recruitment.map(c => {
        return {
          name: c.name, 
          specs: c.specs.map(spec => {
            return {
              name: spec.name,
              status: c.name == action.class && spec.name === action.spec
                ? action.status
                : spec.status
            };
          })
        };
      });
      return newState;
    default:
      return state;
  }
}


