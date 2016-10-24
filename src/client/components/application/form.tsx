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


const validateCharacter = (character, uiUrlRequired = false) => {
  const errors: any = {};
  if (!character.name) {
    errors.name = "Required";
  }
  if (!character.realm) {
    errors.realm = "Required";
  }
  if (!character.class) {
    errors.class = "Required";
  }
  if (!character.primarySpecialization) {
    errors.primarySpecialization = "Required";
  }
  if (!character.secondarySpecialization) {
    errors.secondarySpecialization = "Required";
  }
  if (!character.userInterfaceUrl) {
    if (uiUrlRequired) {
      errors.userInterfaceUrl = "Required";
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

  values.questions && values.questions.forEach((q, i) => {
    if (!q.value) {
      errors.questions[i].value = "Required";
    }
  });

  return errors
};

const formConfig = {
  form: "application",
  validate
};



interface ApplicationFormProps extends FormProps<{}, {}> {
    questions: Question[];
}

class ApplicationFormImpl extends React.PureComponent<ApplicationFormProps, {}> {

    private sub: Subscription;
    constructor(props: {}) {
        super(props);
        getWoWData(() => { });
        this.sub = Observable.timer(30000, 30000)
            .subscribe(x => {
                store.dispatch({
                    type: SAVE_APPLICATION
                });
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
                    <RaisedButton label="Submit" primary={true} onClick={() => {
                        store.dispatch({
                            type: SAVE_APPLICATION
                        });
                    } } />
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

//   <CharacterListContainer></CharacterListContainer>
  // {
                    //     this.props.questions.map((x, i) => (
                    //         <ApplicationQuestion key={x.id} text={x.text} value={x.value}>

                    //         </ApplicationQuestion>))
                    // }
    //  onChange={(e) => this.onQuestionEnter(i, e.target.value) }