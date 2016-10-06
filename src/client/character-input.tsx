import * as React from "react";
import * as BattleNet from "./battlenet/index";

import { Row } from './mui/row';
import { Col } from './mui/col';
import { Panel } from './mui/panel';

import { TextField } from './mui/text-field';

export interface CharacterInputProps {
    title: string;
    character: BattleNet.Character;
    realms: string[];
    classes: BattleNet.CharacterClass[];
    screenshotRequired?: boolean;
    onChange(character: BattleNet.Character): void;
}

export interface CharacterInputState {
    selectedClass?: BattleNet.CharacterClass;
    isValid?: boolean;
    url?: string;
}


export class CharacterInput extends React.Component<CharacterInputProps, CharacterInputState> {

    static defaultState: CharacterInputState = {
        selectedClass: null,
        url: null
    }

    constructor(props: CharacterInputProps) {
        super(props);
        this.state = CharacterInput.defaultState;
        this.state.url = props.character.userInterfaceUrl;
        if (props.character.class && props.classes) {

            //Set selected class
            for (let characterClass of props.classes) {
                if (characterClass.name === props.character.class) {
                    this.state = {
                        selectedClass: characterClass
                    }
                    break;
                }
            }
        }
    }

    onNameChange(name: string) {
        var character = this.props.character;
        character.name = name;
        if (this.props.onChange) {
            this.props.onChange(character);
        }
    }

    onClassSelect(selectedClass: BattleNet.CharacterClass) {
        this.setState({
            selectedClass: selectedClass
        });
        var character = this.props.character;
        character.class = selectedClass.name;
        if (this.props.onChange) {
            this.props.onChange(character);
        }
    }

    onRealmSelect(realm: string) {
        var character = this.props.character;
        character.realm = realm;
        if (this.props.onChange) {
            this.props.onChange(character);
        }
    }

    onSpecializationSelect(specialization: BattleNet.Specialization, priority: number) {
        var character = this.props.character;
        if (priority === 0) {
            character.primarySpecialization = specialization.name;
        } else if (priority === 1) {
            character.secondarySpecialization = specialization.name;
        }
        if (this.props.onChange) {
            this.props.onChange(character);
        }
    }

    onScreenshotUrlChange(url: string) {
        this.setState({
            url: url
        });
        if (!url || typeof url != "string") {
            url = "";
        };
        let matches = url.match(/(?:https?:\/\/(?:www\.)?(?:imgur\.com)|(?:i\.imgur\.com))\/([A-z0-9]{7})\.?|^([A-z0-9]{7})$/);
        let character = this.props.character;
        let newUrl: string = null;
        if (matches && matches.length > 1) {
            if (matches[1]) {
                newUrl = matches[1];
            } else if (matches[2]) {
                newUrl = matches[2];
            } else {
                newUrl = null;
            }
        }

        if (newUrl !== character.userInterfaceUrl && this.props.onChange) {
            character.userInterfaceUrl = newUrl;
            this.props.onChange(character);
        }
    }

    private createSpecializationSelect(priority: number) {
        return this.state.selectedClass
            ? this.state.selectedClass.specs.map(x => (
                <li key={x.order}>
                    <a
                        disabled={this.props.character.primarySpecialization == x.name || this.props.character.secondarySpecialization == x.name}
                        onClick={() => this.onSpecializationSelect(x, priority)}
                        >
                        {x.name}
                    </a>
                </li>))
            : "";
    }

    render() {
        const primarySpecialization = this.createSpecializationSelect(0);
        const secondarySpecialization = this.createSpecializationSelect(1);

        return (
            <Panel >
                <Row>
                    <Col md={12}>
                        <TextField
                            label="Name"
                            type="text"
                            floatingLabel={true}
                            required={true}
                            value={this.props.character.name}
                            onChange={(e) => this.onNameChange(e.target.value)}
                            />
                    </Col>
                    <Col md={12}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {this.props.character.realm || "Realm"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu realm-list" style={{ width: 100 + "%" }}>
                                {
                                    this.props.realms.map((x, i) => <li key={i}><a  onClick={() => this.onRealmSelect(x)}>{x}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }}>
                                {this.state.selectedClass ? this.state.selectedClass.name : "Class"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu" style={{ width: 100 + "%" }}>
                                {
                                    this.props.classes.map(x => <li key={x.id}><a  onClick={() => this.onClassSelect(x)}>{x.name}</a></li>)
                                }
                            </ul>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }} disabled={this.state.selectedClass === null}>
                                {this.props.character.primarySpecialization || "Primary Specialization"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu" style={{ width: 100 + "%" }}>
                                {primarySpecialization}
                            </ul>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="mui-dropdown" style={{ width: 100 + "%" }}>
                            <button className="mui-btn mui-btn--light" data-mui-toggle="dropdown" style={{ width: 100 + "%" }} disabled={this.state.selectedClass === null}>
                                {this.props.character.secondarySpecialization || "Secondary Specialization"}
                                <span className="mui-caret" />
                            </button>
                            <ul className="mui-dropdown__menu" style={{ width: 100 + "%" }}>
                                {secondarySpecialization}

                            </ul>
                        </div>
                    </Col>
                    <Col md={24}>
                        <TextField
                            label="URL of characters UI screenshot in raid combat."
                            type="text"
                            floatingLabel={true}
                            invalid={(this.props.screenshotRequired && !this.props.character.userInterfaceUrl) || (this.state.url && !this.props.character.userInterfaceUrl)}
                            required={!!this.props.screenshotRequired}
                            value={this.state.url}
                            onChange={(x) => this.onScreenshotUrlChange(x.target.value)}
                            />
                    </Col>
                    <Col md={24}>
                        Use
                        <a  href="https://imgur.com"
                            target="_blank">
                            imgur</a>
                    </Col>
                </Row>
                {
                    this.props.character.userInterfaceUrl
                        ? (
                            <Row>
                                <Col sm={16} sm-offset={4}>
                                  <div className="image-warapper">
                                    <img title={this.props.character.userInterfaceUrl} alt="UI screenshot" className="image-preview" src={`https://i.imgur.com/${this.props.character.userInterfaceUrl}m.jpg`} />
                                  </div>
                                </Col>
                            </Row>
                        )
                        : ""
                }

            </Panel>
        );
    }
}
