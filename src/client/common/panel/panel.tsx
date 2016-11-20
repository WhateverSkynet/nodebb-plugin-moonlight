import * as React from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;

}


export const Panel = (props: PanelProps) => {
  return (
    <div className="panel">
      <div className="panel__header">
        {props.title}
      </div>
      <div className="panel__description">
        {props.description}
      </div>
    </div>
  );
};
