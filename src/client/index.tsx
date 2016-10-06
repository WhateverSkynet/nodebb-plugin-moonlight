import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import * as BattleNet from "./battlenet/index";

import { ajaxifyReducer } from "./reducers/ajaxify";
import { LandingPage } from "./pages/landing";
import { Roster } from "./components/roster/roster";

import { AppForm } from "./app-form";


import { AppState } from "./app";


export class Question {
    public id: number;
    public text: string;
}

export interface State {
    ajaxify: any;
    app: AppState;
    routing: any;
}

const rootReducer = (state: AppState, action: any) => {
    if (!state) {
        state = {
            data: {},
            filters: {
                rank: {}
            }
        };
    }
switch (action.type) {
    case "TOGGLE_RANK_FILTER":
      let ranks:any = {};
      let keys: any[];

      if (state.filters.rank[action.value]) {
        keys = Object.keys(state.filters.rank)
        .filter(key => key !== action.value.toString());
      } else {
        keys = Object.keys(state.filters.rank);
        keys.push(action.value);        
      }

      keys.forEach(key => ranks[key] = true);
      return {
        data: state.data,
        filters:{
          rank: ranks
        }
      };
    default:
      return state;
  }
}


const reducer = combineReducers({
    routing: routerReducer,
    app: rootReducer, //you can combine all your other reducers under a single namespace like so
    ajaxify: ajaxifyReducer
});

const initialState: State = {
    app: {
        data: {},
        filters: {
            rank: {}
        }
    },
    ajaxify: {},
    routing: {}
};

export const store = createStore(reducer, initialState,
    window.devToolsExtension && window.devToolsExtension());


const history = syncHistoryWithStore(browserHistory, store);

export const bootstrap = () => {

};

interface AppProps {

}


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
                        <Route path="/landing" component={LandingPage}/>
                        <Route path="/apply" component={AppForm}/>
                        <Route path="/roster" component={Roster}/>
                    </Route>

                </Router>
            </Provider>);
    }
}

export class Page1 extends React.Component<{}, {}> {
    render() {
        return (
            <div>page1</div>
        );
    }
}

export class Page2 extends React.Component<{}, {}> {
    render() {
        return (
            <div>page2</div>
        );
    }
}


export const navigate = (url: string) => {
  browserHistory.push(url);//  store.dispatch(push(url));
};
