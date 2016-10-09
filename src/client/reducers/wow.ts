import { WoWState } from '../states/wow';
import { CharacterClass } from '../../models/wow';

import { Action, Reducer } from "redux";
import * as Actions from "../../actions";

export const wowReducer: Reducer<WoWState> = (state: WoWState = {}, action: Actions.WoWActions = Actions.Action) => {
  switch (action.type) {
    case Actions.WOW_DATA:
      return {
        realms: action.realms,
        classes: action.classes
      };
    default:
      return state;
  }
}
