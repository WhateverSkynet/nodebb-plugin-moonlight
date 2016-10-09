import { Recruitment } from '../../../models/recruitment';
import * as React from "react";
import { connect, } from "react-redux";

import { RecruitmentStatus } from "./recruitment-status";


const apply = () => {
    if (window.ajaxify.data.loggedIn) {
        window.ajaxify.go("/categories")
    } else {
        window.ajaxify.go("/login")
    }
};

export class SpecItem extends React.Component<Recruitment.Spec, {}> {

    render() {
        return (
            <li data-status={this.props.status}>
                <span>{this.props.name}</span>
                <span className="spec__status">
                    <button className="mui-btn apply-btn" onClick={apply}><span>Apply</span></button>
                </span>

            </li>
        );
    }
}

