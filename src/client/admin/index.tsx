import {getSettings} from '../services/settings';
import * as React from "react";
import { Provider } from "react-redux";
import { IndexRedirect, Link, Router, Route, browserHistory } from 'react-router';

import { RecruitmentWidget } from "../components/recruitment/recruitment";
import { history, store } from "../index";

import { BlizzardSettings } from "./blizzard";
import { RosterSettings } from "./roster";

export class AdminTab extends Link {
  render() {
    let router = (this.context as any).router;
    let cls = "";

    if (router) {

      if (router.isActive(this.props.to, this.props.onlyActiveOnIndex)) {
        cls += "mui--is-active"
      }
    }

    return (
      <li className={cls}>
        {super.render()}
      </li>
    );
  }
}


const AdminTabs = (props: React.HTMLAttributes) => (
  <div>
    <div className="mui-panel">
      <ul className="mui-tabs__bar">
        <AdminTab to={{
          pathname: "/admin/plugins/moonlight#recruitment"
        }}>Recruitment</AdminTab>
        <AdminTab to={{
          pathname: "/admin/plugins/moonlight#roster"
        }}>Roster</AdminTab>
        <AdminTab to={{
          pathname: "/admin/plugins/moonlight#blizzard"
        }}>Blizzard Api</AdminTab>
      </ul>
    </div>
    <div>
      {props.children}
    </div>
  </div>
);

export class AdminPage extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    getSettings();
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/admin/plugins/moonlight" component={AdminTabs} >
            <IndexRedirect to="/admin/plugins/moonlight#recruitment" />
            <Route path="/admin/plugins/moonlight#recruitment" component={RecruitmentWidget} />
            <Route path="/admin/plugins/moonlight#roster" component={RosterSettings} />
            <Route path="/admin/plugins/moonlight#blizzard" component={BlizzardSettings} />
          </Route>

        </Router>


      </Provider>
    );
  }
}
