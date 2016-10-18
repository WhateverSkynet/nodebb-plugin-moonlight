import * as React from "react";

interface ImgurImageInputProps {
  url: string;
  label: string;
  required: boolean;
}

export const ImgurImageInput = (props: ImgurImageInputProps) => {
  let input;
  return (
    <div >
      <div className="mui-col-md-16 mui-col-md-offset-4 mui-textfield mui-textfield--float-label">
        <input type="text" ref={node => {
          input = node;
        } }
          required={!!props.required}
          defaultValue={this.props.value}

          />
        <label>{this.props.label}</label>
      </div>
     
    </div>
  );
};