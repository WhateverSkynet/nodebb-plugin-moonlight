import * as React from "react";

import { Container } from "../../mui/container";
import { Row } from "../../mui/row";
import { Col } from "../../mui/col";
import { Panel } from "../../mui/panel";

import { ApplicationQuestion } from "./question";

export class ApplicationForm  extends React.Component<{}, {}> {
    render() {
        return (
           <Container>
                
                <Panel>
                    <h2 className="app-title">Questions</h2>
                  
            
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