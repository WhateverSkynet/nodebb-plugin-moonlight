import { AjaxifyChangeRecruitmentStatusAction, AJAXIFY_CHANGE_RECRUITMENT_STATUS } from '../../actions';
import { State } from '../states/state';
import * as React from "react";
import { connect } from "react-redux";
import { store } from "../index";

interface RecruitmentSetting {
  class: string;
  spec: string;
  status: string;
}

interface RecruitmentWidgetProps {
  classes: RecruitmentSetting[];
}

const handleChange = (list: RecruitmentSetting[], index: number, status: string) => {
  const setting = list[index];
  if (setting.status === status) {
    return;
  }
  const action: AjaxifyChangeRecruitmentStatusAction = {
    type: AJAXIFY_CHANGE_RECRUITMENT_STATUS,
    class: setting.class,
    spec: setting.spec,
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
            <tr className="mui-row">
              <td className="mui-col-md-8 character-class" data-character-class={getCssName(x.class)}><a style={{cursor: "default"}}>{x.class}</a></td>
              <td className="mui-col-md-10">{x.spec}</td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "None"} onClick={() => handleChange(props.classes, i, "None")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "Low"} onClick={() => handleChange(props.classes, i, "Low")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "Medium"} onClick={() => handleChange(props.classes, i, "Medium")} /></td>
              <td className="mui-col-md-3"><input type="radio" checked={x.status === "High"} onClick={() => handleChange(props.classes, i, "High")} /></td>
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
    classes: classes.reduce((total, current) => {
      return total.concat(current.specs.map(x => {
        return {
          class: current.name,
          spec: x.name,
          status: x.status
        };  
      }))
    }, [])
  };
  return props;
};

export const RecruitmentSettings = connect(mapStateToProps)(RecruitmentWidgetImpl);
