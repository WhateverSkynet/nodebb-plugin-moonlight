import * as React from "react";
import { objectWithoutProperties } from "./helpers";

interface InputProps extends React.HTMLAttributes {
    hint?: string;
    invalid?: boolean;
    rows?: number;
}

interface InputState {
    innerValue?: string;
    isDirty?: boolean;
}

class Input extends React.Component<InputProps, InputState> {

    refs: {
        [key: string]: (Element);
        inputEl: (HTMLInputElement);
    }

    public static defaultProps: InputProps = {
        hint: null,
        invalid: false,
        rows: 2
    };

    constructor(props: InputProps) {
        super(props);

        let value = (props.value || "").toString();
        let innerValue = value || (props.defaultValue || "").toString();

        this.state = {
            innerValue: innerValue,
            isDirty: Boolean(innerValue)
        };

        // warn if value defined but onChange is not
        if (value !== undefined && !props.onChange) {
            //    util.raiseError(controlledMessage, true);
        }
    }

    componentDidMount() {
        // disable MUI js
        //    this.refs.inputEl._muiTextfield = true;
    }

    onChange(ev: React.FormEvent) {
        this.setState({ innerValue: ev.target.value });

        // execute callback
        let fn = this.props.onChange;
        if (fn) fn(ev);
    }

    onFocus(ev: React.FocusEvent) {
        this.setState({ isDirty: true });
    }

    triggerFocus() {
        // hack to enable IE10 pointer-events shim
        this.refs.inputEl.focus();
    }
    render() {
        let cls:any = {},
            isNotEmpty = Boolean(this.state.innerValue);
        let properties = objectWithoutProperties(this.props, ["className", "children", "hint", "rows", "invalid", "value"]),
            inputEl: any;
        const classes = ['mui--is-empty', 'mui--is-not-empty', 'mui--is-dirty', 'mui--is-invalid'];
        cls['mui--is-empty'] = !isNotEmpty;
        cls['mui--is-not-empty'] = isNotEmpty;
        cls['mui--is-dirty'] = this.state.isDirty;
        cls['mui--is-invalid'] = this.props.invalid;

        let classNames = classes.filter(x => cls[x]);
        if (this.props.className) {
            classNames.push(this.props.className);
        }
        if (this.props.type === 'textarea') {
            inputEl = (
                <textarea
                    { ...properties }
                //    value={this.props.value || ''}
                    ref="inputEl"
                    className={classNames.join(" ")}
                    rows={this.props.rows}
                    placeholder={this.props.hint}
                    onFocus={(e) => this.onFocus(e)}
                    />
            );
        } else {
            inputEl = (
                <input
                    { ...properties }
                  //  value={this.props.value || ''}
                    ref="inputEl"
                    className={classNames.join(" ")}
                    type={this.props.type}
                    placeholder={this.props.hint}
                    onFocus={(e) => this.onFocus(e)}
                    />
            );
        }

        return inputEl;
    }
}

interface LabelProps extends React.HTMLAttributes {
    text: string;
}


class Label extends React.Component<LabelProps, {}> {
    state = {
        style: {}
    };
    //styleTimer: void;
    static defaultProps: React.HTMLAttributes = {
        text: '',
        onClick: null
    };

    componentDidMount() {
        // this.styleTimer = setTimeout(() => {
        //   const s = '.15s ease-out';
        //   let style;
        //
        //   style = {
        //     transition: s,
        //     WebkitTransition: s,
        //     MozTransition: s,
        //     OTransition: s,
        //     msTransform: s
        //   };
        //
        //   this.setState({style});
        // }, 150);
    }

    componentWillUnmount() {
        // clear timer
        //  clearTimeout(this.styleTimer);
    }

    render() {
        return (
            <label
                //style={this.state.style}
                onClick={this.props.onClick}
                >
                {this.props.text}
            </label>
        );
    }
}


interface TextFieldProps extends React.HTMLAttributes {
    label?: string;
    floatingLabel?: boolean;
}

export class TextField extends React.Component<TextFieldProps, {}> {

    static defaultProps = {
        floatingLabel: false
    };


    onClick(ev: React.MouseEvent) {
        // pointer-events shim
        //  if (util.supportsPointerEvents() === false) {
        //    ev.target.style.cursor = 'text';
        //    this.refs.inputEl.triggerFocus();
        //  }
    }
    render() {
        let cls: any = {},
        labelEl: any;
        let properties = objectWithoutProperties(this.props, ["className", "children", "label", "floatingLabel", "style"]);
        const classes = ['mui-textfield', 'mui-textfield--float-label'];
        cls['mui-textfield'] = true;
        cls['mui-textfield--float-label'] = this.props.floatingLabel;

        let classNames = classes.filter(x => cls[x]);
        if (this.props.className) {
            classNames.push(this.props.className);
        }

        if (this.props.label) {
            labelEl = <Label text={this.props.label} onClick={(e) => this.onClick(e)} />;
        }

        return (
          <div
              className={classNames.join(" ")}
              style={this.props.style}
              >
              <Input ref="inputEl" { ...properties } />
              {labelEl}
          </div>
        );

    }
}
