import { RosterCharacter } from '../../models/wow';
import { RosterState } from '../states/roster';
import { TOGGLE_RANK_FILTER, RosterAction, Action } from '../../actions';

const defaultState = {
  characters: [],
  filters: {
    rank: {}
  }
};
export const rosterReducer = (state: RosterState = defaultState, action: RosterAction = Action) => {
  switch (action.type) {
    case TOGGLE_RANK_FILTER:
      let ranks: { [key: string]: boolean } = {};
      let keys: string[];

      if (state.filters.rank[action.rank]) {
        keys = Object.keys(state.filters.rank)
          .filter(key => key !== action.rank.toString());
      } else {
        keys = Object.keys(state.filters.rank);
        keys.push(action.rank.toString());
      }

      keys.forEach(key => ranks[key] = true);
      return {
        characters: state.characters,
        filters: {
          rank: ranks
        }
      };
    default:
      return state;
  }
};