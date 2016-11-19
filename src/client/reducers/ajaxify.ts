import { AjaxifyState } from '../states/ajaxify';
import { Question } from '../../models/application';
import { RosterCharacter } from '../../models/wow';

import { Reducer } from "redux";
import { AJAXIFY_NEW_APPLICATION, AJAXIFY_ROSTER, AJAXIFY_RECRUITMENT, AJAXIFY_CHANGE_RECRUITMENT_STATUS, AjaxifyAction, Action } from '../../actions';
import { Recruitment } from '../../models/recruitment';

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const defaultState = {
  roster: [],
  recruitment: [],
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
        roster: state.roster
      };
      newState.recruitment = action.classes;
      return newState;
    case AJAXIFY_NEW_APPLICATION:
      newState = {
        recruitment: state.recruitment,
        roster: state.roster
      };
      return newState;
    case AJAXIFY_CHANGE_RECRUITMENT_STATUS:
      newState = {
        roster: state.roster
      };
      newState.recruitment = state.recruitment.map((x, i) => {
        const item: Recruitment.RecruitmentItem = {
          class: x.class,
          role: x.role,
          spec: x.spec,
          status: i === action.index ? action.status : x.status
        };
        return item;
      });
      return newState;
    default:
      return state;
  }
}


