import { getWoWData } from '../services/wow';
import { getSettings } from '../services/settings';
import * as React from "react";
import { Provider } from "react-redux";
import { IndexRedirect, Link, Router, Route, browserHistory } from 'react-router';

import { RecruitmentSettings } from "./recruitment";
import { history, store } from "../index";

import { BlizzardSettings } from "./blizzard";
import { RosterSettings } from "./roster";
import { ApplicationService } from './../services/application';
import { ApplicationSettings } from './application';

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


const AdminTabs = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div>
    <div className="mui-panel">
      <ul className="mui-tabs__bar">
        <AdminTab to={{
          pathname: "/admin/plugins/moonlight#recruitment"
        }}>Recruitment</AdminTab>
        <AdminTab to={{
          pathname: "/admin/plugins/moonlight#application"
        }}>Application</AdminTab>
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
  constructor(props: any) {
    super(props);
    getSettings();
    getWoWData(() => { });
    ApplicationService.getQuestions();
    ApplicationService.getTemplateQuestions();
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/admin/plugins/moonlight" component={AdminTabs} >
            <IndexRedirect to="/admin/plugins/moonlight#recruitment" />
            <Route path="/admin/plugins/moonlight#recruitment" component={RecruitmentSettings} />
            <Route path="/admin/plugins/moonlight#application" component={ApplicationSettings} />
            <Route path="/admin/plugins/moonlight#roster" component={RosterSettings} />
            <Route path="/admin/plugins/moonlight#blizzard" component={BlizzardSettings} />
          </Route>

        </Router>


      </Provider>
    );
  }
}
