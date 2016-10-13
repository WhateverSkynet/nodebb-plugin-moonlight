import { getWoWData } from '../../services/wow';
import { Recruitment } from '../../../models/recruitment';
import { State } from '../../states/state';
import * as React from "react";
import { connect } from "react-redux";

import { ClassPanel, ClassPanelProps } from "./class-panel";

export interface RecruitmentWidgetProps {
    classes: Recruitment.Class[];
}

class RecruitmentWidgetImpl extends React.Component<RecruitmentWidgetProps, {}> {

    constructor(props: RecruitmentWidgetProps, state: {}) {
        super(props, state);
        getWoWData(() => { });
    }
    render() {
        return (

            <ul className="mui-list--unstyled mui-row">
                {
                    this.props.classes
                        .map(c => <li key={c.name} className="mui-col-md-12 mui-col-lg-8"><ClassPanel name={c.name} specs={c.specs} /></li>)
                }
            </ul>

        );
    }
}

const mapStateToProps = (state: State) => {
    const classes = state.ajaxify.recruitment || [];
    const props: RecruitmentWidgetProps = {
        classes: classes
    };
    return props;
}


export const RecruitmentWidget = connect(mapStateToProps)(RecruitmentWidgetImpl);
