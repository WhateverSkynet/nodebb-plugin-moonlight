import * as React from "react";

import { QuestionListContainer } from './question';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { store } from './../../index';
import { SAVE_APPLICATION } from './../../../actions';
import { renderCharacterList } from './characters';
import { getWoWData } from '../../services/wow';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


import { reduxForm, Field, FieldArray, FormProps } from 'redux-form';
import { State } from '../../states/state';
import { connect } from 'react-redux';
import { Question } from '../../../models/application';
import { SUBMIT_APPLICATION } from '../../../actions';
import { Socket } from '../../epics/helpers';
import { getApplicationForm } from '../../epics/application';


const validateCharacter = (character, uiUrlRequired = false) => {
  const errors: any = {};
  // TODO: Remove store ref
  const realms = store.getState().wow.realms;
  if (!character.name) {
    errors.name = "Required.";
  }
  if (!character.realm) {
    errors.realm = "Required";
  } else if (realms.indexOf(character.realm) === -1) {
    errors.realm = "Invalid Realm."
  }
  if (!character.class) {
    errors.class = "Required.";
  }
  if (!character.primarySpecialization) {
    errors.primarySpecialization = "Required.";
  }
  if (!character.secondarySpecialization) {
    errors.secondarySpecialization = "Required.";
  }
  if (!character.userInterfaceUrl) {
    if (uiUrlRequired) {
      errors.userInterfaceUrl = "Required.";
    }
  } else if (!/^(?:https?:\/\/(?:www\.)?(?:imgur\.com)|(?:i\.imgur\.com))\/([A-z0-9]{7})\.?|^([A-z0-9]{7})$/.test(character.userInterfaceUrl)) {
    errors.userInterfaceUrl = "Invalid URL.";
  }
  return errors;
};

const validate = (values) => {
  const errors: any = {
    characters: [],
    questions: []
  };
  values.characters && values.characters.forEach((c, i) => {
    errors.characters[i] = validateCharacter(c, i === 0);
  });

  errors.questions = values.questions
    ? values.questions.map(q => !q || !q.value ? {value:"Required."} : null)
    : [];

  return errors
};

const onSubmit = () => {
   return Socket.emit({ event: 'plugins.ml.application.submitApplication', payload: getApplicationForm(store.getState()) }).toPromise();
};

const formConfig = {
  form: "application",
  validate,
  onSubmit
};

interface ApplicationFormProps extends FormProps<{}, {}> {
  questions: Question[];
  valid: boolean;
  //fix for missing typings
  submitSucceeded: boolean;
}


class ApplicationFormImpl extends React.PureComponent<ApplicationFormProps, {}> {

  private sub: Subscription;
  constructor(props: {}) {
    super(props);
    getWoWData(() => { });
    this.sub = Observable.timer(30000, 30000)
      .subscribe(x => {
        if (!this.props.submitting && !this.props.submitSucceeded) {
          store.dispatch({
            type: SAVE_APPLICATION
          });
        }
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Application"
          />
        <CardText>
          <h2 className="app-title">Characters</h2>

          <FieldArray name="characters" component={renderCharacterList} />
          <h2 className="app-title">Questions</h2>

          <FieldArray name="questions" component={QuestionListContainer} data={{ questions: this.props.questions }} />
          <RaisedButton label="Save" primary={true} disabled={this.props.submitting || this.props.submitSucceeded} onClick={() => store.dispatch({
            type: SAVE_APPLICATION
          })} />
          <RaisedButton label="Submit" primary={true} disabled={this.props.submitting || !this.props.valid || this.props.submitSucceeded} onClick={(e: any) => this.props.handleSubmit(e)} />
        </CardText>
      </Card>

    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    questions: state.app.application.template.questions
  };
};

export const ApplicationForm = connect(mapStateToProps)(reduxForm(formConfig)(ApplicationFormImpl));
