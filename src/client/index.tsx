import './polyfills.ts';
import './dependencies.ts';

import { adminReducer } from './reducers/admin/admin';
import { State } from './states/state';
import { appReducer } from './reducers/app';
import * as React from 'react';
import { render as renderDom } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push, replace } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import createBrowserHistory from 'history/createBrowserHistory';


import { createEpicMiddleware } from 'redux-observable';

import { ajaxifyReducer } from './reducers/ajaxify';
import { wowReducer } from './reducers/wow';
import { Roster } from './components/roster/roster';

import { ApplicationSocket } from './socket/application';
import { appEpic } from './epics';

import { reducer as formReducer } from 'redux-form';

//Rxjs
// import 'rxjs/add/operator/mergeMap';
import { ApplicationForm } from './components/application/form';
import { dbReducer } from './reducers/db';
import { AppListContainer } from './components/application/list';
import { AppDetailsContainer } from './components/application/details';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { LandingPageContainer } from './components/landing';
import { AdminPage } from './admin/index';
import { muiTheme } from './theme';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const history = createBrowserHistory();

const reducer = combineReducers<State>({
  routing: routerReducer,
  app: appReducer,
  ajaxify: ajaxifyReducer,
  wow: wowReducer,
  admin: adminReducer,
  form: formReducer,
  db: dbReducer,
});

const middlewares = [
  createEpicMiddleware(appEpic),
  routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<State>(reducer, composeEnhancers(
  applyMiddleware(...middlewares),
));

// export class Page extends React.Component<{}, {}> {
//   render() {
//     return (
//       <Provider store={store}>
//         <MuiThemeProvider muiTheme={muiTheme}>
//           <LandingPageContainer />
//           <ConnectedRouter history={history}>
//             <Switch >
//               <Route path='/' component={LandingPageContainer} />
//               <Route path='/landing' component={LandingPageContainer} />
//               <Route path='/apply' component={ApplicationForm} />
//               <Route path='/applications' component={AppListContainer} />
//               <Route path='/application/:id' component={AppDetailsContainer} />
//               <Route path='/roster' component={Roster} />
//             </Switch>
//           </ConnectedRouter >

//         </MuiThemeProvider>
//       </Provider>);
//   }
// }

export { AdminPage } from './admin';

// export const navigate = (url: string, quiet: boolean) => {
//   const action = quiet ? replace(url) : push(url);
//   store.dispatch(action);
// };


export const initSocket = () => {
  ApplicationSocket.register();
};

const matchRoute = (path: string) => {
  switch (path) {
    case '/': return <LandingPageContainer />;
    case '/landing': return <LandingPageContainer />;
    case '/apply': return <ApplicationForm />;
    case '/applications': return <AppListContainer />;
    case '/roster': return <Roster />;
    default:
      if (path.startsWith('/application/')) {
        return <AppDetailsContainer />;
      }
      console.error('No matching component found!');
  }
};

export const render = (container: Element, path: string) => {
  const component = matchRoute(path);
  renderDom(
    (<Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        {component}
      </MuiThemeProvider>
    </Provider>),
    container,
  );
};


export const renderAdmin = (container: Element) => {
  renderDom(
    React.createElement(AdminPage, {}),
    container,
  );
};
