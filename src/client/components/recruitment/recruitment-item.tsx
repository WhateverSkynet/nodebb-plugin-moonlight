import * as React from "react";
import { connect, } from "react-redux";
import { Recruitment } from '../../../models/recruitment';
import { SpecItem } from "./spec-item";

const getCssName = (str: string) => {
    return str.toLowerCase()
        .replace(/ /, "");
};

export interface RecruitmentItemProps {
    class: string;
    spec: string;
    status: string;
}

export const RecruitmentItem = (props: RecruitmentItemProps) => {
    return (
        <li className="recruitment-item">
            <div className="recruitment-item--classicon">
                <img src={`http://ktek.online/whatever/icons/${props.class.toLowerCase().replace(" ", "")}-60x60.png`} alt={props.class}></img>
            </div>
            <div className="recruitment-item--spec">
                {props.spec}
            </div>
            <div className="recruitment-item--status">
                <span className={props.status.toLowerCase()}></span>
            </div>
        </li>
    );
}
