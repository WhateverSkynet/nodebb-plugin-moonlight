import * as React from "react";
import {objectWithoutProperties} from "./helpers";

interface ContainerProps extends React.HTMLAttributes {
  fluid?: boolean;
}

export class Container extends React.Component<ContainerProps, {}> {

  render() {
    let properties = objectWithoutProperties(this.props, ["className", "children", "fluid"]);
    let classNames = [`mui-container${this.props.fluid ? "-fluid" : ""}`];
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
