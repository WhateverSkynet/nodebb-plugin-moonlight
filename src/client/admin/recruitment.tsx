import { AjaxifyChangeRecruitmentStatusAction, AJAXIFY_CHANGE_RECRUITMENT_STATUS } from '../../actions';
import { State } from '../states/state';
import * as React from "react";
import { connect } from "react-redux";
import { store } from "../index";
import { Recruitment } from '../../models/recruitment';

import { publicPath } from '../util';

import { classIcons } from '../../assets/assets';

interface RecruitmentWidgetProps {
  classes: Recruitment.RecruitmentItem[];
}

const handleChange = (index: number, status: Recruitment.Status) => {
  const action: AjaxifyChangeRecruitmentStatusAction = {
    type: AJAXIFY_CHANGE_RECRUITMENT_STATUS,
    index: index,
    status: status
  }
  store.dispatch(action);
};

const saveSettings = () => {
  window.socket.emit('plugins.ml.recruitment.set', {
    values: store.getState().ajaxify.recruitment
  }, (err) => {

    window.app.alert({
      title: 'Recruitment Saved Saved',
      type: 'success',
      timeout: 2500
    });

  });
};

const getCssName = (str: string) => {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/ /, "");
};

const RecruitmentWidgetImpl: React.StatelessComponent<RecruitmentWidgetProps> = (props: RecruitmentWidgetProps) => (
  <div className="container">
    <div className="panel">
      <h2 className="panel__header">Recruitment Settings</h2>
      <div className="panel__content">
        <table className="table">
          <thead>
            <tr className="row">
              <th className="col-md-4">Class</th>
              <th className="col-md-4">Spec</th>
              <th className="col-md-1">None</th>
              <th className="col-md-1">Low</th>
              <th className="col-md-1">Medium</th>
              <th className="col-md-1">High</th>
            </tr>
          </thead>
          <tbody>
            {
              props.classes.map((x, i) => (
                <tr key={x.class + x.role + x.spec} className="row" data-odd={i % 2 === 0 }>
                  <td className="col-md-4">
                    <img src={`${publicPath}/${classIcons[x.class.toLowerCase().replace(" ", "-")]}`} alt={x.class} style={{
                      width: 22,
                      height: 22,
                      marginRight: 5
                    }}></img>
                    <span>{x.class}</span>
                  </td>
                  <td className="col-md-4">{x.spec || x.role}</td>
                  <td className="col-md-1"><input type="radio" checked={x.status === "None"} onChange={() => handleChange(i, "None")} /></td>
                  <td className="col-md-1"><input type="radio" checked={x.status === "Low"} onChange={() => handleChange(i, "Low")} /></td>
                  <td className="col-md-1"><input type="radio" checked={x.status === "Medium"} onChange={() => handleChange(i, "Medium")} /></td>
                  <td className="col-md-1"><input type="radio" checked={x.status === "High"} onChange={() => handleChange(i, "High")} /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <button className="panel__button panel__button--action" onClick={() => saveSettings()}>Save</button>
    </div>
  </div>
);

const mapStateToProps = (state: State) => {
  const classes = state.ajaxify.recruitment || [];
  const props: RecruitmentWidgetProps = {
    classes: classes
  };
  return props;
};

export const RecruitmentSettings = connect(mapStateToProps)(RecruitmentWidgetImpl);
