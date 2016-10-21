import * as React from "react";
import {objectWithoutProperties} from "./helpers";

export class Panel extends React.Component<React.HTMLAttributes, {}> {

  render() {
    let properties = objectWithoutProperties(this.props, ["className", "children"]);
    let classNames = ["mui-panel"];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
      return (
        <div {...properties}
        className = {  classNames.join(" ") }
        >
        { this.props.children }
      </div >
    );
  }
}