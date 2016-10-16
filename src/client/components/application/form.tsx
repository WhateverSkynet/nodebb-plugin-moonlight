import * as React from "react";

import { Container } from "../../mui/container";
import { Row } from "../../mui/row";
import { Col } from "../../mui/col";
import { Panel } from "../../mui/panel";

import { QuestionListContainer } from './question';
import { Subscription, Observable } from 'rxjs/Rx';
import { store } from './../../index';
import { SAVE_APPLICATION } from './../../../actions';

export class ApplicationForm  extends React.Component<{}, {}> {

    private sub: Subscription;
    componentDidMount() {
        this.sub = Observable.timer(30000, 30000)
        .subscribe(x => {
            store.dispatch({
                type: SAVE_APPLICATION,
                template: store.getState().app.application.template
            });
        });
    }
    render() {
        return (
           <Container>
                
                <Panel>
                    <h2 className="app-title">Questions</h2>
                  
                    <QuestionListContainer></QuestionListContainer>
                </Panel>
            </Container>
        );
    }
}
  // {
                    //     this.props.questions.map((x, i) => (
                    //         <ApplicationQuestion key={x.id} text={x.text} value={x.value}>
                            
                    //         </ApplicationQuestion>))
                    // }
    //  onChange={(e) => this.onQuestionEnter(i, e.target.value) }