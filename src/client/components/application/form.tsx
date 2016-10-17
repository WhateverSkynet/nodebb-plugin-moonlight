import * as React from "react";

import { QuestionListContainer } from './question';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { store } from './../../index';
import { SAVE_APPLICATION } from './../../../actions';


export class ApplicationForm extends React.Component<{}, {}> {

    private sub: Subscription;
    constructor(props: {}) {
        super(props);
        this.sub = Observable.timer(30000, 30000)
            .subscribe(x => {
                store.dispatch({
                    type: SAVE_APPLICATION,
                    template: store.getState().app.application.template
                });
            });
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render() {
        return (

            <div className="mui-panel">
                <h2 className="app-title">Questions</h2>

                <QuestionListContainer></QuestionListContainer>
            </div>
        );
    }
}
  // {
                    //     this.props.questions.map((x, i) => (
                    //         <ApplicationQuestion key={x.id} text={x.text} value={x.value}>

                    //         </ApplicationQuestion>))
                    // }
    //  onChange={(e) => this.onQuestionEnter(i, e.target.value) }