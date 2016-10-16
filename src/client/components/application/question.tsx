import * as React from "react";

import { State } from './../../states/state';
import { connect } from 'react-redux';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { bindActionCreators } from 'redux';
import { APPLICATION_QUESTION_VALUE_CHANGED, ApplicationQuestionValueChangedAction } from './../../../actions';
import { Question } from './../../../models/application';

interface QuestionProps extends React.HTMLAttributes {
    value: string;
    text: string;
    onValueChanged: (text: string) => void;
}

class QuestionComponent extends React.Component<QuestionProps, {}> {
    private subject = new Subject<string>();
    private sub: Subscription;
    constructor(props: QuestionProps) {
        super(props);
    }

    componentDidMount() {
        this.sub = this.subject
            .throttleTime(350)
            .subscribe(x => {
                if (this.props.onValueChanged) {
                    this.props.onValueChanged(x);
                }
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
            <li className="mui-row">
                <div className="mui-col-md-16 mui-col-md-offset-4 mui-textfield mui-textfield--float-label">
                    <textarea
                        required={true}
                        defaultValue={this.props.value}
                        rows={5}
                        onChange={(e) => this.onChangeHandler(e)}
                        />
                    <label>{this.props.text}</label>
                </div>
            </li>
        );
    }
}

interface QuestionListProps {
    questions: Question[];
    actions: {
        questionValueChanged:  (qid: number, newValue: string) => ApplicationQuestionValueChangedAction
    }
}

const QuestionList = (props: QuestionListProps) => (

        <ul className="mui-list--unstyled">
            {
                props.questions.map(q => <QuestionComponent key={q.qid} text={q.text} value={q.value}  onValueChanged={val => props.actions.questionValueChanged(q.qid, val)}/>)
            }

        </ul>

    );

const mapStateToProps = (state: State) => {
    return {
        questions: state.app.application.template.questions
    };
};

const mapDispatchToProps = (dispatch: any) => {
 return {
    actions: bindActionCreators({
      questionValueChanged: (qid: number, newValue: string) => ({
        type: APPLICATION_QUESTION_VALUE_CHANGED,
        qid,
        newValue
      }),

    }, dispatch)
  };
};

export const QuestionListContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionList);

// onChange={(e) => this.onQuestionEnter(i, e.target.value)}