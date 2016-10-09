import { AjaxifyState } from '../states/ajaxify';
import { Question } from '../../models/application';
import {RosterCharacter} from '../../models/wow';

import { Reducer } from "redux";
import { AJAXIFY_ROSTER, AJAXIFY_RECRUITMENT, AjaxifyAction, Action} from '../../actions';

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const defaultState = {
  roster: [],
  recruitment: []
}
export const ajaxifyReducer = (state: AjaxifyState = defaultState, action: AjaxifyAction = Action) => {
  let newState: AjaxifyState;
  switch (action.type) {
    case AJAXIFY_ROSTER:
      newState = {};
      newState.roster = action.characters.sort((a:RosterCharacter, b:RosterCharacter) => a.rank - b.rank);
      return newState;
      case AJAXIFY_RECRUITMENT:
      newState = {};
      newState.recruitment = action.classes;
      return newState;
    default:
      return state;
  }
  // if (action.type === LOCATION_CHANGE) {
  //     let newSate: AjaxifyState = {}
  //     // newSate.recruitment = window.ajaxify.data.recruitment;
  //     // newSate.realms = window.ajaxify.data.realms;
  //     // newSate.characterClasses = window.ajaxify.data.classes;
  //     // newSate.questions = window.ajaxify.data.questions;
  //     // newSate.members = window.ajaxify.data.members ? window.ajaxify.data.members.sort((a:any, b:any) => a.rank - b.rank) : undefined;
  //     return newSate;
  // }

}

// const recruitment = (state: any, action: AjaxifyAction) => {
//     if (!state) {
//         state = [];
//     }
//     switch (action.type) {
//         case AJAXIFY_UPDATE: return action.ajaxify.data.recruitment;
//         default: return state;
//     }
// }