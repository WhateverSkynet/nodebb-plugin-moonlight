import './polyfills.ts';
import './dependencies.ts';

import { adminReducer } from './reducers/admin/admin';
import { AdminState } from './states/admin/admin';
import { State } from './states/state';
import { AppState } from './states/app';
import { appReducer } from './reducers/app';
import { Action } from '../actions';
import * as React from "react";
import { render as renderDom } from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import { createEpicMiddleware } from "redux-observable";

import { ajaxifyReducer } from './reducers/ajaxify';
import { wowReducer } from './reducers/wow';
import { Roster } from "./components/roster/roster";

import { RecruitmentWidget } from "./components/recruitment/recruitment";
import { ApplicationSocket } from './socket/application';
import { appEpic } from "./epics";

import { reducer as formReducer } from 'redux-form'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const injectTapEventPlugin = require("react-tap-event-plugin");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
//Rxjs
// import 'rxjs/add/operator/mergeMap';
import { ApplicationForm } from './components/application/form';
import { dbReducer } from './reducers/db';
import { AppListContainer } from './components/application/list';
import { AppDetailsContainer } from './components/application/app';

const reducer = combineReducers<State>({
  routing: routerReducer,
  app: appReducer,
  ajaxify: ajaxifyReducer,
  wow: wowReducer,
  admin: adminReducer,
  form: formReducer,
  db: dbReducer
});

const epicMiddleware = createEpicMiddleware(appEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore<State>(reducer, composeEnhancers(
  applyMiddleware(epicMiddleware)
));


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
              <Route path="/landing" component={RecruitmentWidget} />
              <Route path="/apply" component={ApplicationForm} />
              <Route path="/applications" component={AppListContainer} />
              <Route path="/application/:id" component={AppDetailsContainer} />
              <Route path="/roster" component={Roster} />
            </Route>
            <Route path='*' />

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
  ApplicationSocket.register();
};

export const render = (container: Element) => {
  renderDom(
    React.createElement(Page, {}),
    container
  );
}