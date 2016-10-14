import { adminReducer } from './reducers/admin/admin';
import { AdminState } from './states/admin/admin';
import { State } from './states/state';
import { AppState } from './states/app';
import { appReducer } from './reducers/app';
import { Action } from '../actions';
import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import { ajaxifyReducer } from './reducers/ajaxify';
import { wowReducer } from './reducers/wow';
import { Roster } from "./components/roster/roster";

import { AppForm } from "./app-form";

import { RecruitmentWidget } from "./components/recruitment/recruitment";
import { ApplicationSocket } from './socket/application';

const reducer = combineReducers<State>({
  routing: routerReducer,
  app: appReducer,
  ajaxify: ajaxifyReducer,
  wow: wowReducer,
  admin: adminReducer
});

export const store = createStore<State>(reducer,
  window.devToolsExtension && window.devToolsExtension());


export const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component<React.HTMLAttributes, {}> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export class Page extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/landing" component={RecruitmentWidget} />
            <Route path="/apply" component={AppForm} />
            <Route path="/roster" component={Roster} />
          </Route>

        </Router>
      </Provider>);
  }
}

export { AdminPage } from "./admin";

export const navigate = (url: string) => {
  browserHistory.replace(url);
};


export const initSocket = () => {
  ApplicationSocket.register();
};