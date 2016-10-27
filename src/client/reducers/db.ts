import { combineReducers } from 'redux';
import { DbState, ApplicationDbState } from '../states/db';
import { Action, AJAXIFY_APPLICATION_LIST, AjaxifyAction } from '../../actions';
import { ApplicationTemplate } from '../../models/application';
import { State } from '../states/state';


export const selectApplications = (state: State) => {
  return state.db.applications.allIds.map(x => state.db.applications.byId[x]);
};

const byIdApplicationReducer = (state: { [appId: number]: ApplicationTemplate } = {}, action: AjaxifyAction = Action) => {
  switch (action.type) {
    case AJAXIFY_APPLICATION_LIST:
      state = {};
      for (let app of action.payload.applications) {
        state[app.appId] = app;
      }
      return state;
    default:
      return state;
  }
};

const allIdApplicationReducer = (state: number[] = [], action: AjaxifyAction = Action) => {
  switch (action.type) {
    case AJAXIFY_APPLICATION_LIST:
      return action.payload.applications.map(x => x.appId);
    default:
      return state;
  }
};

export const applicationReducer = combineReducers<ApplicationDbState>({
  byId: byIdApplicationReducer,
  allIds: allIdApplicationReducer
});


export const dbReducer = combineReducers<DbState>({
  applications: applicationReducer
});
