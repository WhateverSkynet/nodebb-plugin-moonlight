import { getWoWData } from '../../services/wow';
import { Recruitment } from '../../../models/recruitment';
import { State } from '../../states/state';
import * as React from "react";
import { connect } from "react-redux";

import { RecruitmentItem } from './recruitment-item';

export interface RecruitmentWidgetProps {
  classes: Recruitment.RecruitmentItem[];
}

const statusPriority = [
  "None",
  "Low",
  "Medium",
  "High"
];

const apply = () => {
  if (window.ajaxify.data.loggedIn) {
    window.ajaxify.go("/apply")
  } else {
    window.ajaxify.go("/login")
  }
};

class RecruitmentWidgetImpl extends React.Component<RecruitmentWidgetProps, {}> {

  constructor(props: RecruitmentWidgetProps, state: {}) {
    super(props, state);
    getWoWData(() => { });
  }
  render() {
    return (
      <div className="recruitment-container">
        <div className="recruitment-title">
          Recruitment status
            </div>
        <ul>
          {
            this.props.classes
              .map(c => <RecruitmentItem key={c.class + c.spec} class={c.class} spec={c.spec || c.role || c.class} status={c.status} />)
          }
        </ul>
        <div className="recruitment-description">
          Want to join us? We <strong>always</strong> consider exceptional applicants of any class regardless of recruitment status.
            </div>
        <div className="button-recruitment" onClick={() => apply()}>
          Apply now!
            </div>
      </div>
    );
  }
}

const statusSort = (a: Recruitment.RecruitmentItem, b: Recruitment.RecruitmentItem) =>
  statusPriority.indexOf(b.status) - statusPriority.indexOf(a.status);

const mapStateToProps = (state: State) => {
  const classes = state.ajaxify.recruitment || [];
  const props: RecruitmentWidgetProps = {
    classes: classes
      .filter(c => c.status !== "None")
      .sort(statusSort)
  };
  return props;
}


export const RecruitmentWidget = connect(mapStateToProps)(RecruitmentWidgetImpl);
