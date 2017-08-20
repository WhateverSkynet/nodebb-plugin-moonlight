import { getWoWData } from '../services/wow';
import { getSettings } from '../services/settings';
import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import { RecruitmentSettings } from './recruitment';
import { store } from '../index';

import { BlizzardSettings } from './blizzard';
import { RosterSettings } from './roster';
import { ApplicationService } from './../services/application';
import { ApplicationSettings } from './application';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from '../theme';
import { BlogContainer } from './blog';
import { DiscordSettings } from './discord';

const linkStyle = {
  marginRight: '5px',
};

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
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router>
            <div className='mui-panel'>
              <ul className='mui-tabs__bar'>
                <NavLink style={linkStyle} to='/recruitment'>Recruitment</NavLink>
                <NavLink style={linkStyle} to='/blog'>News</NavLink>
                <NavLink style={linkStyle} to='/application'>Application</NavLink>
                <NavLink style={linkStyle} to='/roster'>Roster</NavLink>
                <NavLink style={linkStyle} to='/blizzard'>Blizzard Api</NavLink>
                <NavLink style={linkStyle} to='/discord'>Discord Api</NavLink>
              </ul>
              <div>
                <Switch>
                  <Route exact path='/' >
                    <Redirect to='/recruitment' />
                  </Route>
                  <Route path='/recruitment' component={RecruitmentSettings} />
                  <Route path='/blog' component={BlogContainer} />
                  <Route path='/application' component={ApplicationSettings} />
                  <Route path='/roster' component={RosterSettings} />
                  <Route path='/blizzard' component={BlizzardSettings} />
                  <Route path='/discord' component={DiscordSettings} />
                </Switch>
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
