
import * as React from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { ApplicationTemplate } from '../../../models/application';
import { connect } from 'react-redux';
import { State } from '../../states/state';
import { selectApplications } from '../../reducers/db';
import { bindActionCreators } from 'redux';
import { navigate, store } from '../../index';
import { browserHistory } from 'react-router';

import { publicPath } from '../../util';
import { DeleteApplicationAction, DELETE_APPLICATION, SORT_APPLICATION_BY, SortApplicationByAction, TOGGLE_STATUS_FILTER, ToggleStatusFilterAction } from '../../../actions';
import RaisedButton from 'material-ui/RaisedButton';

import { classIcons } from '../../../assets/assets';
import Checkbox from 'material-ui/Checkbox';

interface AppListProps {
  apps?: ApplicationTemplate[];
  disabledStatuses?: { [key: string]: boolean };
  isAdmin?: boolean;
  isMember?: boolean;
  delete?: (appId: number) => DeleteApplicationAction;
  actions?: {
    sortBy?: (propertyName: string) => SortApplicationByAction;
    toggleStatus?: (status: number) => ToggleStatusFilterAction;
  };
}

const appStatus = [
  'Draft',
  'New',
  'Pending',
  'Withdrawn',
  'Interview',
  'Accepted',
  'Declined',
];

const styles = {
  checkbox: {
    marginBottom: 16,
    width: 'auto',
    display: 'inline-block',
    marginRight: 16,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const AppList = (props: AppListProps) => {
  const authorClassName = props.isAdmin ? 'col-xs-2' : 'col-xs-3';
  return (
    <div className='section'>
      <div className='panel'>
        <h2 className='panel__header'>Applications</h2>
        <div className='panel__content'>
          {
            props.isAdmin || props.isMember
              ? <div>
                <h4>Statuses</h4>
                <div style={styles.row}>
                  {
                    appStatus.map((x, index) => (
                      <Checkbox key={x}
                        checked={props.disabledStatuses[index] === undefined}
                        onCheck={() => props.actions.toggleStatus(index)}
                        label={x}
                        style={styles.checkbox}
                      />
                    ))
                  }
                </div>
              </div>
              : ''
          }
          <table className='table'>
            <thead>
              <tr className='row'>
                <th className='col-xs-1 clickable' onClick={() => props.actions.sortBy('appId')}>Id</th>
                <th className='col-xs-1 col-sm-2' >Character</th>
                <th className={authorClassName} >Author</th>
                <th className='col-xs-3 col-sm-2 clickable' onClick={() => props.actions.sortBy('status')}>Status</th>
                <th className='hidden-xs col-sm-2 clickable' onClick={() => props.actions.sortBy('submitted')} >Submitted</th>
                <th className='col-xs-3 col-sm-2 clickable' onClick={() => props.actions.sortBy('changed')}>Changed</th>
                {
                  props.isAdmin
                    ? <th className='col-xs-2' ></th>
                    : <th style={{ display: 'none' }}></th>
                }
              </tr>
            </thead>
            <tbody style={
              {
                // backgroundColor: "#cce4f2",
              }
            }>
              {
                props.apps.map((app, i) =>
                  <tr key={app.appId} className='row clickable' style={
                    {
                      background: i % 2 === 0 ? '#cce4f2' : 'transparent',
                    }
                  } onClick={() => window.ajaxify.go(`/application/${app.appId}`)} >
                    <td className='col-xs-1'>{app.appId}</td>
                    <td className='col-sm-2'>
                      {
                        app.characters[0].class
                          ? <img className='roster__class-icon'
                            src={`${publicPath}/${classIcons[app.characters[0].class.toLowerCase().replace(' ', '-')]}`}
                            alt={app.characters[0].class}></img>
                          : ''
                      }
                      <span className='hidden-xs'>{app.characters[0].name}</span>
                    </td>
                    <td className={authorClassName}>{app.author}</td>
                    <td className='col-xs-3 col-sm-2'>{appStatus[app.status]}</td>
                    <td className='hidden-xs col-sm-2'>
                      {
                        app.submitted
                          ? <span className='timeago' title={new Date(app.submitted).toString()}>{window.jQuery.timeago(app.submitted)}</span>
                          : <span ></span>
                      }
                    </td>
                    <td className='col-xs-3 col-sm-2'>
                      <span className='timeago' title={new Date(app.changed).toString()}>{window.jQuery.timeago(app.changed)}</span>
                    </td>
                    {
                      props.isAdmin
                        ? <td className='col-xs-2' >
                          <RaisedButton
                            secondary={true}
                            label='Delete'
                            onClick={(e) => {
                              props.delete(app.appId);
                              e.stopPropagation();
                            }}
                          />
                        </td>
                        : <td style={{ display: 'none' }}></td>
                    }
                  </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export const getProperty = (obj: any, property: string) => {
  const parts = property.split('.');

  for (let propertyName of parts) {
    obj = obj[propertyName];
  }

  return obj;
};

export const sort = (property: string, direction: string) => {
  if (direction === 'ASC') {
    return (a: ApplicationTemplate, b: ApplicationTemplate) => getProperty(a, property) - getProperty(b, property);
  }
  return (a: ApplicationTemplate, b: ApplicationTemplate) => getProperty(b, property) - getProperty(a, property);
};

const mapStateToProps = (state: State) => {
  const { isAdmin, isMember } = window.app.user;
  const { sortBy, sortDirection, statuses } = state.app.applicationList.filters;
  const apps = isAdmin || isMember
    ? [...selectApplications(state)].sort(sort(sortBy, sortDirection))
      .filter((app) => !statuses[app.status])
    : selectApplications(state);
  const props: AppListProps = {
    disabledStatuses: statuses,
    apps,
    isAdmin,
    isMember,
  };
  return props;
};

const mapDispatchToProps = (dispatch: any, ownProps: AppListProps) => {
  const props: AppListProps = {
    actions: bindActionCreators({
      delete: (appId: number) => {
        return {
          type: DELETE_APPLICATION,
          payload: {
            appId,
          },
        };
      },
      toggleStatus: (status: number) => {
        return {
          type: TOGGLE_STATUS_FILTER,
          status,
        };
      },
      sortBy: (propertyName: string) => {
        return {
          type: SORT_APPLICATION_BY,
          propertyName,
        };
      },
    }, dispatch),
  };
  return props;
};

export const AppListContainer = connect(mapStateToProps, mapDispatchToProps)(AppList);
