import * as React from "react";
import { connect, } from "react-redux";

import { RecruitmentStatus } from "./recruitment-status";


export interface SpecItemProps {
    name: string;
    status: RecruitmentStatus;
}

export class SpecItem extends React.Component<SpecItemProps, {}> {

    render() {
        return (
            <li  data-status={this.props.status}>
                <span>{this.props.name}</span>
                <span className="spec__status">
                    <button className="mui-btn apply-btn"><span>Apply</span></button>
                </span>

            </li>
        );
    }
}

