import * as React from "react";
import { connect, } from "react-redux";
import { Recruitment } from '../../../models/recruitment';
//import image from "image-webpack!../../../assets/icons/rogue-60x60.png";
 
import { publicPath } from '../../util';

const icons = {
  "warrior": require("../../../assets/icons/warrior-60x60.png"),
  "paladin": require("../../../assets/icons/paladin-60x60.png"),
  "hunter": require("../../../assets/icons/hunter-60x60.png"),
  "rogue": require("../../../assets/icons/rogue-60x60.png"),
  "priest": require("../../../assets/icons/priest-60x60.png"),
  "death-knight": require("../../../assets/icons/death-knight-60x60.png"),
  "shaman": require("../../../assets/icons/shaman-60x60.png"),
  "mage": require("../../../assets/icons/mage-60x60.png"),
  "warlock": require("../../../assets/icons/warlock-60x60.png"),
  "monk": require("../../../assets/icons/monk-60x60.png"),
  "druid": require("../../../assets/icons/druid-60x60.png"),
  "demon-hunter": require("../../../assets/icons/demon-hunter-60x60.png"),
};

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
        <img src={`${publicPath}/${icons[props.class.toLowerCase().replace(" ", "-")]}`} alt={props.class}></img>
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
