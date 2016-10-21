import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import * as React from "react";

interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    label: string;
    onValueChanged: (text: string) => void;
}


export class TextField extends React.Component<TextFieldProps, {}> {
    private subject = new Subject<string>();
    private sub: Subscription;
    constructor(props: TextFieldProps) {
        super(props);
    }

    componentDidMount() {
        this.sub = this.subject
            .throttleTime(350)
            .subscribe(x => {
                this.props.onValueChanged && this.props.onValueChanged(x);
            });
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }
    private onChangeHandler(event: any) {
        this.subject.next(event.target.value);
    }
    render() {
        return (
          <div className="mui-textfield mui-textfield--float-label">
              <input
                type="text"
                  required={this.props.required}
                  defaultValue={this.props.value}
                  onChange={(e) => this.onChangeHandler(e)}
                  />
              <label>{this.props.label}</label>
          </div>
        );
    }
}
