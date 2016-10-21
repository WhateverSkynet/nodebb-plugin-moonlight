import { connect } from 'react-redux';
import { State } from './../../states/state';

import * as React from "react";
import { ADD_APPLICATION_CHARACTER, AddApplicationCharacterAction, REMOVE_APPLICATION_CHARACTER, RemoveApplicationCharacter, RemoveApplicationCharacterAction } from './../../../actions';
import { bindActionCreators } from 'redux';
import { CharacterClass } from '../../../models/wow';
import { SelectCharacterClass, SELECT_CHARACTER_CLASS, SelectCharacterClassAction, ApplicationCharacterDataChangedAction, APPLICATION_CHARACTER_DATA_CHANGED } from '../../../actions';
import { ApplicationCharacter, ApplicationCharacterChange } from '../../../models/application';
import { TextField } from '../../common/textfield';
import { CharacterClassSelectorContainer } from './class';
import { CharacterSpecSelectorContainer } from './spec';
import { RealmSelectorContainer } from './realms';

interface ImgurImageInputProps {
  url: string;
  label: string;
  required: boolean;
}

const ImgurImageInput = (props: ImgurImageInputProps) => {
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

interface CharacterProps {
  isMain?: boolean;
  character?: ApplicationCharacter;
  onRemoveClick?: () => void;
  actions?: {
    change: (property: string, value: string) => ApplicationCharacterDataChangedAction;
  };
}

const validateImgurUrl = (url: string) => {

  if (!url || typeof url != "string") {
    url = "";
  };
  let matches = url.match(/(?:https?:\/\/(?:www\.)?(?:imgur\.com)|(?:i\.imgur\.com))\/([A-z0-9]{7})\.?|^([A-z0-9]{7})$/);
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
  return newUrl;
};
const Character: React.StatelessComponent<CharacterProps> = (props: CharacterProps) => {

  return (
    <div className="mui-panel">
     { 
       !props.isMain 
       ? (<button className="mui-btn  mui-btn--primary" onClick={() => props.onRemoveClick && props.onRemoveClick()}>Remove</button>)
       : ""
      }
      <TextField value={props.character.name} onValueChanged={(str) => props.actions.change("name", str)} label="Name"></TextField>
      <RealmSelectorContainer value={props.character.realm} onSelect={(str) => props.actions.change("realm", str)} ></RealmSelectorContainer>
      <CharacterClassSelectorContainer value={props.character.class} onSelect={(str) => props.actions.change("class", str)} ></CharacterClassSelectorContainer>
      <CharacterSpecSelectorContainer value={props.character.primarySpecialization}
        class={props.character.class}
        onSelect={(str) => props.actions.change("primarySpecialization", str)}
        label="Primary Specialization">
      </CharacterSpecSelectorContainer>
      <CharacterSpecSelectorContainer value={props.character.secondarySpecialization}
        class={props.character.class}
        onSelect={(str) => props.actions.change("secondarySpecialization", str)}
        label="Secondary Specialization">
      </CharacterSpecSelectorContainer>

      <TextField value={props.character.userInterfaceUrl} required={props.isMain} onValueChanged={(str) => {
        const newUrl = validateImgurUrl(str);
        if (newUrl && newUrl !== props.character.userInterfaceUrl) {
          props.actions.change("userInterfaceUrl", newUrl)
        }
      }
      } label="UI Screenshot URL"></TextField>
      {
                    props.character.userInterfaceUrl
                        ? (
                            <div className="mui-row">
                                <div className="mui-col-sm-16 mui-col-sm-4--offset">
                                    <div className="image-warapper">
                                        <img title={props.character.userInterfaceUrl} alt="UI screenshot" className="image-preview" 
                                        src={`https://i.imgur.com/${props.character.userInterfaceUrl}m.jpg`} />
                                    </div>
                                </div>
                            </div>
                        )
                        : ""
                }
    </div>
  );
};

const mapCharacterDispatchToProps = (dispatch: any, ownProps: CharacterProps) => {
  const props: CharacterProps = {
    actions: bindActionCreators({
      change: (property: string, value: string) => {
        const action: ApplicationCharacterDataChangedAction = {
          type: APPLICATION_CHARACTER_DATA_CHANGED,
          characterGuid: ownProps.character.guid,
          changed: {
            [property]: value
          }
        };
        return action;
      }
    }, dispatch)
  };
  return props;
};

const CharacterContainer = connect(null, mapCharacterDispatchToProps)(Character);

interface CharacterListProps {
  characters: ApplicationCharacter[];
  actions?: {
    addCharacter: () => AddApplicationCharacterAction;
    removeCharacter: (guid: string) => RemoveApplicationCharacterAction;
  };
}

const CharacterList = (props: CharacterListProps) => {

  return (
    <div>
      <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.addCharacter()}>Add</button>
      <ul className="mui-list--unstyled">
        {
          props.characters.map((c, i) => {
            return <li key={c.guid}>
              <CharacterContainer isMain={i === 0} character={c} onRemoveClick={() => props.actions.removeCharacter(c.guid)}></CharacterContainer>
            </li>
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const props: CharacterListProps = {
    characters: state.app.application.template.characters
  };
  return props;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators({
      addCharacter: () => ({
        type: ADD_APPLICATION_CHARACTER
      }),
      removeCharacter: (guid: string) => ({
        type: REMOVE_APPLICATION_CHARACTER,
        guid
      })
    }, dispatch)
  }
};

export const CharacterListContainer = connect(mapStateToProps, mapDispatchToProps)(CharacterList);