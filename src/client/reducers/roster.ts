import { RosterCharacter } from '../../models/wow';
import { RosterState } from '../states/roster';
import { TOGGLE_RANK_FILTER, RosterAction, Action, SORT_ROSTER_BY, TOGGLE_CLASS_FILTER } from '../../actions';

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
    sortDirection: "ASC",
    charClass: {}
  }
};

export const rosterReducer = (state: RosterState = defaultState, action: RosterAction = Action) => {
 
  let keys: string[];
  switch (action.type) {
    case TOGGLE_RANK_FILTER:
      let ranks: { [key: string]: boolean } = {};
     
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
          sortDirection: state.filters.sortDirection,
          charClass: state.filters.charClass
        }
      };
      case TOGGLE_CLASS_FILTER:
        let charClasses: { [key: string]: boolean } = {};

        if (state.filters.charClass[action.charClass]) {
          keys = Object.keys(state.filters.charClass)
            .filter(key => key !== action.charClass.toString());
        } else {
          keys = Object.keys(state.filters.charClass);
          keys.push(action.charClass.toString());
        }

      keys.forEach(key => charClasses[key] = true);
      return {
        characters: state.characters,
        filters: {
          rank: state.filters.rank,
          sortBy: state.filters.sortBy,
          sortDirection: state.filters.sortDirection,
          charClass: charClasses
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
            sortDirection: state.filters.sortDirection === "ASC" ? "DESC" : "ASC",
            charClass: state.filters.charClass
          }
        };
      } else {

        return {
          characters: state.characters,
          filters: {
            rank: state.filters.rank,
            sortBy: action.propertyName,
            sortDirection: "ASC",
            charClass: state.filters.charClass
          }
        };
      }
    default:
      return state;
  }
};