import { TOGGLE_RANK_FILTER, Action, TOGGLE_CLASS_FILTER, ApplicationAction, SORT_APPLICATION_BY, TOGGLE_STATUS_FILTER } from '../../actions';
import { ApplicationListState } from '../states/application-list.state';

const defaultState = {
  filters: {
    statuses: {
      '0': true,
      '3': true,
      '5': true,
      '6': true,
    },
    sortBy: 'rank',
    sortDirection: 'ASC',
  },
};

export default (state: ApplicationListState = defaultState, action: ApplicationAction = Action) => {

  switch (action.type) {
    case TOGGLE_STATUS_FILTER:
      let keys;
      let statuses: { [key: string]: boolean } = {};

      if (state.filters.statuses[action.status]) {
        keys = Object.keys(state.filters.statuses)
          .filter(key => key !== action.status.toString());
      } else {
        keys = Object.keys(state.filters.statuses);
        keys.push(action.status.toString());
      }

      keys.forEach(key => statuses[key] = true);
      return {
        filters: {
          statuses,
          sortBy: state.filters.sortBy,
          sortDirection: state.filters.sortDirection,
        },
      };
    case SORT_APPLICATION_BY:
      if (state.filters.sortBy === action.propertyName) {
        ///togle

        return {
          filters: {
            statuses: state.filters.statuses,
            sortBy: action.propertyName,
            sortDirection: state.filters.sortDirection === 'ASC' ? 'DESC' : 'ASC',
          },
        };
      } else {

        return {
          filters: {
            statuses: state.filters.statuses,
            sortBy: action.propertyName,
            sortDirection: 'ASC',
          },
        };
      }
    default:
      return state;
  }
};