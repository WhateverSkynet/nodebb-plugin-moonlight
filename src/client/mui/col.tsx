import * as React from "react";
import {objectWithoutProperties} from "./helpers";

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

interface ColProps extends React.HTMLAttributes {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "xs-offset"?: number;
  "sm-offset"?: number;
  "md-offset"?: number;
  "lg-offset"?: number;
  "xl-offset"?: number;
}


export class Col extends React.Component<ColProps, {}> {

  render() {
    let propertiesToRemove = ["className", "children"]
    const columnOffsetClasses = breakpoints
      .filter(x => !!this.props[`${x}-offset`])
      .map(x => {
        propertiesToRemove.push(`${x}-offset`);
        return `mui-col-${x}-offset-${this.props[`${x}-offset`]}`
      });
    const columnClasses = breakpoints
      .filter(x => !!this.props[x])
      .map(x => {
        propertiesToRemove.push(x);
        return `mui-col-${x}-${this.props[x]}`
      });
    const properties = objectWithoutProperties(this.props, propertiesToRemove);
    let classNames = columnClasses.concat(columnOffsetClasses);
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    return (
      <div {...properties}
        className = { classNames.join(" ") }
        >
        { this.props.children }
      </div >
    );
  }
}
