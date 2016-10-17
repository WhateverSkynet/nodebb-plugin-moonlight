import { connect } from 'react-redux';
import { State } from './../../states/state';
import { ApplicationCharacter } from './../../../models/application';

import * as React from "react";
import { ADD_APPLICATION_CHARACTER, AddApplicationCharacterAction, REMOVE_APPLICATION_CHARACTER, RemoveApplicationCharacter, RemoveApplicationCharacterAction } from './../../../actions';
import { bindActionCreators } from 'redux';

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
  
}

const Character = (props: CharacterProps) => {

  return (
    <div></div>
  );
};

interface CharacterListProps {
  characters: ApplicationCharacter[];
  actions?: {
    addCharacter: () => AddApplicationCharacterAction;
    removeCharacter: (id: string) => RemoveApplicationCharacterAction;
  };
}

const CharacterList = (props: CharacterListProps) => {

  return (
    <div>
    <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.addCharacter()}>Add</button>
      <ul>
        {
          props.characters.map(c => {
            return <li key={c.guid}><div>{c.guid}</div> <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.removeCharacter(c.guid)}>Remove</button></li>
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const props:CharacterListProps = {
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