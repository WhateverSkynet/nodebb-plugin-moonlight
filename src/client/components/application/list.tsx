
import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { ApplicationTemplate } from '../../../models/application';
import { connect } from 'react-redux';
import { State } from '../../states/state';
import { selectApplications } from '../../reducers/db';
import { bindActionCreators } from 'redux';
import { navigate, store } from '../../index';
import { browserHistory } from 'react-router';

interface AppListProps {
  apps?: ApplicationTemplate[];


  navigateToDetails?: (row: number, column: number) => void;
}


const AppList = (props: AppListProps) => {
  return (
    <div>
      <Table
        fixedHeader={true}
        selectable={true}
        onCellClick={props.navigateToDetails}
        >
        <TableHeader 
        adjustForCheckbox={false}
        displaySelectAll={false}
          >
          <TableRow>
            <TableHeaderColumn tooltip="Id">ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="Author">Author</TableHeaderColumn>
            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
            deselectOnClickaway={true}
            displayRowCheckbox={false}
            stripedRows={true}
          >
          {props.apps.map((app, index) => (
            <TableRow key={app.appId} >
              <TableRowColumn>{app.appId}</TableRowColumn>
              <TableRowColumn>{app.uid}</TableRowColumn>
              <TableRowColumn>{app.status}</TableRowColumn>
              <TableRowColumn>{app.status}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    navigateToDetails: (row: number, column: number) => {
      const appId = selectApplications(store.getState())[row].appId;
      return browserHistory.push(`/application/${appId}`);
    }
  }, dispatch);
  return props;
};

export const AppListContainer = connect(mapStateToProps, mapDispatchToProps)(AppList);