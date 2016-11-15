import { connect } from 'react-redux';
import { State } from './../../states/state';

import * as React from "react";
import { bindActionCreators } from 'redux';
import { CharacterClass } from '../../../models/wow';
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
  isInvalidUserInterfaceUrl?: boolean;

}

const validateUrl = (url: string) => {
  if (!url) {
    return url;
  }
  const matches = url.match(/(?:https?:\/\/(?:www\.)?(?:imgur\.com)|(?:i\.imgur\.com))\/([A-z0-9]{7})\.?|^([A-z0-9]{7})$/);
  if (matches && matches.length > 1) {
    if (matches[1]) {
      return matches[1];
    } else if (matches[2]) {
      return matches[2];
    }
  }
  return url;
};

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
      <Field name={`${props.field}.userInterfaceUrl`} component={renderTextField} data={{ label: "UI Screenshot URL" }} normalize={validateUrl} />


      {
        props.userInterfaceUrl && !props.isInvalidUserInterfaceUrl
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

const valueSelector = formValueSelector('application');

const mapStateToProps = (state, ownProps) => {
  const errors = state.form.application.syncErrors;
  const className = valueSelector(state, `${ownProps.field}.class`);
  const userInterfaceUrl = valueSelector(state, `${ownProps.field}.userInterfaceUrl`);
  const isInvalidUserInterfaceUrl = errors && !!errors.characters[ownProps.index].userInterfaceUrl;
  return {
    class: className,
    userInterfaceUrl,
    isInvalidUserInterfaceUrl
  };
};
const CharacterContainer = connect(mapStateToProps)(Character);


export const renderCharacterList = ({fields, meta: {error}}) => (
  <div>

    <ul className="list--unstyled">
      {
        fields.map((f, i) => {
          const remove = () => fields.remove(i);
          return <li key={i}>
            <div className="panel">
              <h2 className="panel__header">
                Character
            </h2>
              <div className="panel__content">
                <CharacterContainer field={f} onRemoveClick={remove} index={i} />
              </div>
              {
                i !== 0
                  ? (<button className="panel__button panel__button--destructive" onClick={() => fields.remove(i)}>Remove</button>)
                  : ""
              }
            </div>
          </li>
        })
      }
    </ul>
    <div className="panel__button panel__button--action" onClick={() => fields.push({ guid: UUID.v4() })}>
      Add Character
    </div>
  </div>
);

export const CharacterListContainer = renderCharacterList;