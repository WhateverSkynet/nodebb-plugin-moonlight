import * as React from "react";
import { connect, } from "react-redux";

import { SpecItemProps, SpecItem } from "./spec-item";

const getCssName = (str: string) => {
    return str.toLowerCase()
        .replace(/ /, "");
};

export interface ClassPanelProps {
    name: string;
    specs: SpecItemProps[];
}

export class ClassPanel extends React.Component<ClassPanelProps, {}> {

    render() {
        return (
            <div className="recruitment-class mui-panel mui-row">
                <div className="recruitment-class__name mui-col-xs-2 mui-col-sm-4 rotated-text" data-character-class={getCssName(this.props.name) }>
                    <div className="rotated-text__inner ">{this.props.name}</div>
                </div>
                <div className="recruitment-class__specs mui-col-xs-22 mui-col-sm-20">
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