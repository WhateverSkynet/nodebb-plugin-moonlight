import * as React from "react";
import { connect, } from "react-redux";
import { Recruitment } from '../../../models/recruitment';
import { SpecItem } from "./spec-item";

const getCssName = (str: string) => {
    return str.toLowerCase()
        .replace(/ /, "");
};

export interface ClassPanelProps {
    name: string;
    specs: Recruitment.Spec[];
}

export class ClassPanel extends React.Component<ClassPanelProps, {}> {

    render() {
        return (
            <div className="recruitment-class mui-panel mui-row">
                <div className="recruitment-class__name mui-col-xs-24" data-character-class={getCssName(this.props.name) }>
                    <div className="">{this.props.name}</div>
                </div>
                <div className="recruitment-class__specs mui-col-xs-24 mui-col-sm-24">
                    <ul className="mui-list--unstyled">
                        {
                            this.props.specs.map(s => <SpecItem key={s.name} name={s.name} status={s.status} />)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}