import { RosterCharacter } from '../../models/wow';
import { RosterState } from '../states/roster';
import { TOGGLE_RANK_FILTER, RosterAction, Action, SORT_ROSTER_BY } from '../../actions';

const defaultState = {
  characters: [],
  filters: {
    rank: {
      "2": true,
      "5": true,
      "6": true,
      "7": true
    },
    sortBy: "rank",
    sortDirection: "ASC"
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
          rank: ranks,
          sortBy: state.filters.sortBy,
          sortDirection: state.filters.sortDirection
        }
      };
    case SORT_ROSTER_BY:
      if (state.filters.sortBy === action.propertyName) {
        ///togle
        
        return {
          characters: state.characters,
          filters: {
            rank: state.filters.rank,
            sortBy: action.propertyName,
            sortDirection: state.filters.sortDirection === "ASC" ? "DESC" : "ASC"
          }
        };
      } else {

        return {
          characters: state.characters,
          filters: {
            rank: state.filters.rank,
            sortBy: action.propertyName,
            sortDirection: "ASC"
          }
        };
      }
    default:
      return state;
  }
};