
import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { ApplicationTemplate } from '../../../models/application';
import { connect } from 'react-redux';
import { State } from '../../states/state';
import { selectApplications } from '../../reducers/db';
import { bindActionCreators } from 'redux';
import { navigate, store } from '../../index';
import { browserHistory } from 'react-router';

import { publicPath } from '../../util';

const icons = {
  "warrior": require("../../../assets/icons/warrior-60x60.png"),
  "paladin": require("../../../assets/icons/paladin-60x60.png"),
  "hunter": require("../../../assets/icons/hunter-60x60.png"),
  "rogue": require("../../../assets/icons/rogue-60x60.png"),
  "priest": require("../../../assets/icons/priest-60x60.png"),
  "death-knight": require("../../../assets/icons/death-knight-60x60.png"),
  "shaman": require("../../../assets/icons/shaman-60x60.png"),
  "mage": require("../../../assets/icons/mage-60x60.png"),
  "warlock": require("../../../assets/icons/warlock-60x60.png"),
  "monk": require("../../../assets/icons/monk-60x60.png"),
  "druid": require("../../../assets/icons/druid-60x60.png"),
  "demon-hunter": require("../../../assets/icons/demon-hunter-60x60.png"),
};


interface AppListProps {
  apps?: ApplicationTemplate[];

  navigateToDetails?: (row: ApplicationTemplate) => void;
}

const appStatus = [
  "Draft",
  "New",
  "Pending",
  "Withdrawn",
  "Interview",
  "Accepted",
  "Declined"
];

const AppList = (props: AppListProps) => {
  return (
    <div className="section">
      <div className="panel">
        <h2 className="panel__header">Applications</h2>
        <div className="panel__content">
          <table className="table">
            <thead>
              <tr className="row">
                <th className="col-xs-1" ></th>
                <th className="col-xs-1" >Id</th>
                <th className="col-xs-6" >Author</th>
                <th className="col-xs-2 hidden-xs" >Class</th>
                <th className="col-xs-2" >Status</th>
              </tr>
            </thead>
            <tbody style={
              {
                // backgroundColor: "#cce4f2",
              }
            }>
              {
                props.apps.map((app, i) =>
                  <tr key={app.appId} className="row" style={
                    {
                      background: i % 2 === 0 ? "#cce4f2" : "transparent",
                    }
                  } onClick={() => props.navigateToDetails(app)}>
                    <td className="col-xs-1">
                      {
                        app.characters[0].class
                          ? <img className="roster__class-icon" src={`${publicPath}/${icons[app.characters[0].class.toLowerCase().replace(" ", "-")]}`} alt={app.characters[0].class}></img>
                          : ""
                      }
                    </td>
                    <td className="col-xs-1">{app.appId}</td>
                    <td className="col-xs-6">{app.author}</td>
                    <td className="col-xs-2 hidden-xs">{app.characters[0].class}</td>
                    <td className="col-xs-2">{appStatus[app.status]}</td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: State) => {
  const props: AppListProps = {
    apps: selectApplications(state)
  };
  return props;
};

const mapDispatchToProps = (dispatch: any, ownProps: AppListProps) => {
  const props: AppListProps = bindActionCreators({
    navigateToDetails: (app: ApplicationTemplate) => {
      return window.ajaxify.go(`/application/${app.appId}`);
    }
  }, dispatch);
  return props;
};

export const AppListContainer = connect(mapStateToProps, mapDispatchToProps)(AppList);