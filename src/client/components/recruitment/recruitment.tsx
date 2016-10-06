import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../index";

import { ClassPanel, ClassPanelProps } from "./class-panel";

export interface RecruitmentWidgetProps {
    classes: ClassPanelProps[];
}

class RecruitmentWidgetImpl extends React.Component<RecruitmentWidgetProps, {}> {

    render() {
        return (
            <div className="mui-panel">
                <ul className="mui-list--unstyled mui-row">
                    {
                        this.props.classes
                            .map(c => <li key={c.name}  className="mui-col-sm-12 mui-col-md-8"><ClassPanel name={c.name} specs={c.specs}/></li>)
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    var props: RecruitmentWidgetProps = {
        classes: state.ajaxify.recruitment
    };
    return  props;
}


export const RecruitmentWidget = connect(mapStateToProps)(RecruitmentWidgetImpl);
