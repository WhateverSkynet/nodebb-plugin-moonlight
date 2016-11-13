import { AjaxifyChangeRecruitmentStatusAction, AJAXIFY_CHANGE_RECRUITMENT_STATUS } from '../../actions';
import { State } from '../states/state';
import * as React from "react";
import { connect } from "react-redux";
import { store } from "../index";
import { Recruitment } from '../../models/recruitment';


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
  <div className="mui-panel">
    <table>
      <thead>
        <tr className="mui-row">
          <th className="mui-col-md-8">Class</th>
          <th className="mui-col-md-10">Spec</th>
          <th className="mui-col-md-3">None</th>
          <th className="mui-col-md-3">Low</th>
          <th className="mui-col-md-3">Medium</th>
          <th className="mui-col-md-3">High</th>
        </tr>
      </thead>
      <tbody>
        {
          props.classes.map((x, i) => (
            <tr key={x.class + x.role + x.spec} className="mui-row">
              <td className="mui-col-md-8 character-class" data-character-class={getCssName(x.class)}><a style={{cursor: "default"}}>{x.class}</a></td>
              <td className="mui-col-md-10">{x.spec || x.role}</td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "None"} onClick={() => handleChange(i, "None")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "Low"} onClick={() => handleChange(i, "Low")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "Medium"} onClick={() => handleChange(i, "Medium")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "High"} onClick={() => handleChange(i, "High")} /></td>
            </tr>
          ))
        }

      </tbody>

    </table>
    <button className="mui-btn  mui-btn--primary" onClick={() => saveSettings()}>Save</button>
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
