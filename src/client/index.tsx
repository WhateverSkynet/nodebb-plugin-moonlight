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

import { render as renderDom } from "react-dom";

import { ajaxifyReducer } from './reducers/ajaxify';
import { wowReducer } from './reducers/wow';
import { Roster } from "./components/roster/roster";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { RecruitmentWidget } from "./components/recruitment/recruitment";
import { LandingPage } from './components/landing';

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

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

class App extends React.Component<React.HTMLAttributes<HTMLDivElement>, {}> {
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
        <MuiThemeProvider>

          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="/landing" component={LandingPage} />
              <Route path="/roster" component={Roster} />
            </Route>

          </Router>
        </MuiThemeProvider>
      </Provider>);
  }
}

export { AdminPage } from "./admin";

export const navigate = (url: string) => {
  browserHistory.replace(url);
};

export const initSocket = () => {
  //ApplicationSocket.register();
};

export const render = (container: Element) => {
  renderDom(
    React.createElement(Page, {}),
    container
  );
}