import {getWoWData} from './services/wow';
import {State} from './states/state';
import {CharacterClass} from '../models/wow';
import {Question, ApplicationCharacter} from '../models/application';
import * as React from 'react';


import { CharacterInput } from "./character-input";

import { connect } from "react-redux";

import { Container } from './mui/container';
import { Row } from './mui/row';
import { Col } from './mui/col';
import { Panel } from './mui/panel';
import { TextField } from './mui/text-field';

import * as BattleNetData from "./battlenet/data";


export interface AppFormProps {
    realms: string[];
    characterClasses: CharacterClass[];
    questions: Question[];
    characters: ApplicationCharacter[];
    onSubmit?(characters: ApplicationCharacter[], questions: Question[]): void;

}

export interface AppFormState {
    questions?: Question[];
    characters?: ApplicationCharacter[];
    isValid?: boolean;
}


class AppFormImpl extends React.Component<AppFormProps, AppFormState> {

    constructor(props: AppFormProps) {
        super(props);
        this.state = {
            questions: props.questions,
            characters: props.characters,
            isValid: false
        };
          getWoWData(() => { });
    }

    onCharacterChange(character: ApplicationCharacter, index: number) {
        if (index < this.state.characters.length) {
            let characters = this.state.characters;
            characters[index] = character;
            let isValid = this.isValid(characters, this.state.questions);
            this.setState({
                characters: characters,
                isValid: isValid
            });
        }
    }

    onAddCharacter() {
        let characters = this.state.characters;
        let character: ApplicationCharacter = {
            id: new Date().getTime()
        };
        characters.push(character);
        let isValid = this.isValid(characters, this.state.questions);
        this.setState({
            characters: characters,
            isValid: isValid
        });
    }

    onRemoveCharacter(character: ApplicationCharacter) {
        let characters = this.state.characters;
        const index = characters.indexOf(character);
        characters.splice(index, 1);
        let isValid = this.isValid(characters, this.state.questions);
        this.setState({
            characters: characters,
            isValid: isValid
        });
    }

    isCharacterValid(character: ApplicationCharacter, screenshotRequired?: boolean) {
        if (character.name && character.realm && character.class && character.primarySpecialization && character.secondarySpecialization && (!screenshotRequired || character.userInterfaceUrl)) {
            return true;
        }
        return false;
    }

    onSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.characters, this.state.questions);
        }
    }

    isValid(characters: ApplicationCharacter[], questions: Question[]) {
        let validCharacters = characters.filter((x, i) => this.isCharacterValid(x, i === 0)).length === characters.length;
        let validQuestions = questions.filter(x => !!x.value).length === questions.length;
        return validCharacters && validQuestions && this.state.characters.length >= 1;
    }

    onQuestionEnter(index: number, value: string) {
        let questions = this.state.questions;
        questions[index].value = value;
        let isValid = this.isValid(this.state.characters, questions);
        this.setState({
            questions: questions,
            isValid: isValid
        });
    }

    render() {
        // <TextField
        //     label={x.text}
        //     type="textarea"
        //     floatingLabel={true}
        //
        //
        //     onChange={(e) => this.onQuestionEnter(i, e.target.value)}
        //     />
        return (
            <Container>
                <Panel >
                    <Row>
                        <Col xs={12} className="app-title">
                            <h2 className="app-title">Characters</h2>
                        </Col>
                        <Col xs={12} sm={8} md={6}  className="mui--pull-right">
                            <button type="button" className="mui-btn btn-primary" style={{ width: '100%' }} onClick={() => this.onAddCharacter() }>Add Character</button>
                        </Col>
                    </Row>
                    <Row>
                        <ul className="mui-list--unstyled">
                            {
                                this.state.characters.map((x, i) => (
                                    <li key={x.id}>
                                        <Col md={16} md-offset={4}>
                                            <CharacterInput character={x} title="Character" classes={this.props.characterClasses} realms={this.props.realms} onChange={(c) => this.onCharacterChange(c, i) } screenshotRequired={i === 0}/>
                                        </Col>
                                        {i !== 0
                                            ? (<Col md={4}>
                                                <button type="button" className="mui-btn btn-primary" onClick={() => this.onRemoveCharacter(x) }>Remove</button>
                                            </Col>)
                                            : ""
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </Row>
                </Panel>
                <Panel>
                    <h2 className="app-title">Questions</h2>
                    {
                        this.state.questions.map((x, i) => (
                            <Row key={x.qid}>
                                <Col md={16} md-offset={4}>
                                    <Panel>
                                        <div className="mui-textfield mui-textfield--float-label">
                                            <textarea
                                                required={true}
                                                value={x.value}
                                                rows={5}
                                                onChange={(e) => this.onQuestionEnter(i, e.target.value) }
                                                />
                                            <label>{x.text}</label>
                                        </div>
                                    </Panel>
                                </Col>
                            </Row>))
                    }
                    <button type="button" className="mui-btn btn-primary" disabled={!this.state.isValid} onClick={() => this.onSubmit() }>Submit</button>
                </Panel>
            </Container>
        );
    }
}

const mapStateToProps = (state: State) => {
    var props:AppFormProps = {
        realms: state.wow.realms,
        characterClasses: state.wow.classes,
        questions: state.app.application.questions,
        characters: [{id: 0}]
    };
    return props; 
};


export const AppForm = connect(mapStateToProps)(AppFormImpl);