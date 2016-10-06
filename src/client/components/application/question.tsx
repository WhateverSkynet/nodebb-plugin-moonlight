import * as React from "react";

import { Row } from "../../mui/row";
import { Col } from "../../mui/col";
import { Panel } from "../../mui/panel";

import { Question } from "../../models/index";

export class ApplicationQuestion extends React.Component<Question, {}> {
    render() {
        return (
            <Row>
                <Col md={16} md-offset={4}>
                    <Panel>
                        <div className="mui-textfield mui-textfield--float-label">
                            <textarea
                                required={true}
                                value={this.props.value}
                                rows={5}
                                
                                />
                            <label>{this.props.text}</label>
                        </div>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
// onChange={(e) => this.onQuestionEnter(i, e.target.value) }