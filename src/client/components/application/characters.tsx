import { connect } from 'react-redux';
import { State } from './../../states/state';

import * as React from "react";
import { ADD_APPLICATION_CHARACTER, AddApplicationCharacterAction, REMOVE_APPLICATION_CHARACTER, RemoveApplicationCharacter, RemoveApplicationCharacterAction } from './../../../actions';
import { bindActionCreators } from 'redux';
import { CharacterClass } from '../../../models/wow';
import { SelectCharacterClass, SELECT_CHARACTER_CLASS, SelectCharacterClassAction, ApplicationCharacterDataChangedAction, APPLICATION_CHARACTER_DATA_CHANGED } from '../../../actions';
import { ApplicationCharacter, ApplicationCharacterChange } from '../../../models/application';

import { CharacterClassSelectorContainer } from './class';
import { CharacterSpecSelectorContainer } from './spec';
import { RealmSelectorContainer } from './realms';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as UUID from "uuid";

import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';

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

  field?: string;
  class?: string;
  index?: number;
  userInterfaceUrl?: string;

}

const renderTextField = ({ data, input, label, meta: { touched, error } }) => {
  return (
    <TextField
      floatingLabelText={data.label}
      fullWidth={true}
      floatingLabelFixed={true}
      errorText={touched && error}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      />
  );
};

const Character = (props: CharacterProps) => {
  return (
    <div>

      <Field name={`${props.field}.name`} component={renderTextField} data={{ label: "Name" }} />
      <Field name={`${props.field}.realm`} component={RealmSelectorContainer} data={{ label: "Realm" }} />
      <Field name={`${props.field}.class`} component={CharacterClassSelectorContainer} data={{ label: "Class" }} />
      <Field name={`${props.field}.primarySpecialization`} component={CharacterSpecSelectorContainer} data={{
        label: "Primary Specialization",
        class: props.class
      }} />
      <Field name={`${props.field}.secondarySpecialization`} component={CharacterSpecSelectorContainer} data={{
        label: "Secondary Specialization",
        class: props.class
      }} />
      <Field name={`${props.field}.userInterfaceUrl`} component={renderTextField} data={{ label: "UI Screenshot URL" }}/>


      {
        props.userInterfaceUrl
          ? (
            <div className="mui-row">
              <div className="mui-col-sm-16 mui-col-sm-4--offset">
                <div className="image-warapper">
                  <img title={props.userInterfaceUrl} alt="UI screenshot" className="image-preview"
                    src={`https://i.imgur.com/${props.userInterfaceUrl}m.jpg`} />
                </div>
              </div>
            </div>
          )
          : ""
      }



    </div>
  );
};

const selector = formValueSelector('application');
const mapStateToProps2 = (state, ownProps) => {

  const className = selector(state, `${ownProps.field}.class`);
  const userInterfaceUrl = selector(state, `${ownProps.field}.userInterfaceUrl`);

  return {
    class: className,
    userInterfaceUrl
  };
};
const CharacterContainer = connect(mapStateToProps2)(Character);


// <TextField value={props.character.userInterfaceUrl}  onChange={(e) => {
//           const newUrl = validateImgurUrl(e.target.value);
//           if (newUrl && newUrl !== props.character.userInterfaceUrl) {
//             props.actions.change("userInterfaceUrl", newUrl)
//           }
//         }
//         } floatingLabelText="UI Screenshot URL"></TextField>
//         {
//           props.character.userInterfaceUrl
//             ? (
//               <div className="mui-row">
//                 <div className="mui-col-sm-16 mui-col-sm-4--offset">
//                   <div className="image-warapper">
//                     <img title={props.character.userInterfaceUrl} alt="UI screenshot" className="image-preview"
//                       src={`https://i.imgur.com/${props.character.userInterfaceUrl}m.jpg`} />
//                   </div>
//                 </div>
//               </div>
//             )
//             : ""
//         }
//  <RealmSelectorContainer onSelect={(str) => props.actions.change("realm", str)} ></RealmSelectorContainer>
//       <CharacterClassSelectorContainer value={props.character.class} onSelect={(str) => props.actions.classChange(str)} ></CharacterClassSelectorContainer>
//       <CharacterSpecSelectorContainer value={props.character.primarySpecialization}
//         class={props.character.class}
//         onSelect={(str) => props.actions.change("primarySpecialization", str)}
//         label="Primary Specialization">
//       </CharacterSpecSelectorContainer>
//       <CharacterSpecSelectorContainer value={props.character.secondarySpecialization}
//         class={props.character.class}
//         onSelect={(str) => props.actions.change("secondarySpecialization", str)}
//         label="Secondary Specialization">
//       </CharacterSpecSelectorContainer>
// <Field name={`characters[0].name`} component={renderTextField} type="textarea" label={`${index}. ${this.props.questions[index].text}`} />
// const mapCharacterDispatchToProps = (dispatch: any, ownProps: CharacterProps) => {
//   const props: CharacterProps = {
//     actions: bindActionCreators({
//       change: (property: string, value: string) => {
//         const action: ApplicationCharacterDataChangedAction = {
//           type: APPLICATION_CHARACTER_DATA_CHANGED,
//           characterGuid: ownProps.character.guid,
//           changed: {
//             [property]: value
//           }
//         };
//         return action;
//       },
//       classChange: (className: string) => {
//         const action: SelectCharacterClassAction = {
//           type: SELECT_CHARACTER_CLASS,
//           characterGuid: ownProps.character.guid,
//           className
//         };
//         return action;
//       }
//     }, dispatch)
//   };
//   return props;
// };

// const CharacterContainer = connect(null, mapCharacterDispatchToProps)(Character);

interface CharacterListProps {
  characters: ApplicationCharacter[];
  actions?: {
    addCharacter: () => AddApplicationCharacterAction;
    removeCharacter: (guid: string) => RemoveApplicationCharacterAction;
  };
}


export const renderCharacterList = ({fields, meta: {error}}) => (
  <div>
    <RaisedButton label="Add" primary={true} onClick={() => fields.push({ guid: UUID.v4() })} />
    <ul className="list--unstyled">
      {
        fields.map((f, i) => {
          const remove = () => fields.remove(i);
          return <li key={i}>
            {
              i !== 0
                ? (<RaisedButton label="Remove" primary={true} onClick={() => fields.remove(i)}></RaisedButton>)
                : ""
            }

            <CharacterContainer field={f} onRemoveClick={remove} index={i} />
          </li>
        })
      }
    </ul>
  </div>
);

const CharacterList = (props: CharacterListProps) => {

  return (
    <div>
      {renderCharacterList}
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

//export const CharacterListContainer = connect(mapStateToProps, mapDispatchToProps)(CharacterList);



export const CharacterListContainer = renderCharacterList;