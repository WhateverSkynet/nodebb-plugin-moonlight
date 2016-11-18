import { BlizzardSettingsState } from '../states/admin/blizzard-settings';
import { State } from '../states/state';
import { RosterCharacter } from '../../models/wow';
import { AdminSetBlizzardSettingsAction, ADMIN_SET_BLIZZARD_SETTINGS } from '../../actions';
import * as React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { store } from "../index";
import { Question } from './../../models/application';
import { ApplicationService } from './../services/application';
import { EDIT_QUESTION, QUESTION_UPDATE_INITIATED, QUESTION_UPDATE_SUCCESS, ApplicationAction, ADD_QUESTION_TO_TEMPLATE, REMOVE_QUESTION_FROM_TEMPLATE, AddQuestionToTemplateAction, RemoveQuestionFromTemplateAction, MOVE_TEMPLATE_QUESTION_UP, MOVE_TEMPLATE_QUSTION_DOWN, MoveTemplateQuestionUpAction, MoveTemplateQuestionDownAction, INIT_APPLICATION_TEMPLATE_SAVE, InitializeApplicationTemplateSaveAction } from './../../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 12,
};


interface QuestionInputProps {
  onClick: (value: string) => void;
  buttonEnabled: boolean;
  buttonLabel: string;
  defaultValue?: string;
}

const QuestionInput: React.StatelessComponent<QuestionInputProps> = (props: QuestionInputProps) => {
  let textField;
  return (
    <div>
      <TextField
        className="mnl-text-field"
        ref={(node) => textField = node}
        floatingLabelFixed={true}
        fullWidth={true}
        floatingLabelStyle={{
          color: "#007ABE",
          fontWeight: 400
        }}
        multiLine={true}
        defaultValue={props.defaultValue || ""}
        floatingLabelText="Question Text" />
      <RaisedButton
        primary={true}
        label={props.buttonLabel}
        disabled={!props.buttonEnabled}
        onClick={() => {
          props.onClick(textField.input.refs.input.value);
          textField.input.refs.input.value = "";
        } }
        style={buttonStyle} />
    </div>
  );
};

interface QuestionMangerProps {
  questions: Question[];
  editIndex: number;
  actions?: {
    updateQuestion?: (question: Question, newText: string) => ApplicationAction;
    deleteQuestion?: (question: Question) => ApplicationAction;
    addToTemplate?: (question: Question) => AddQuestionToTemplateAction;
  }
}
const createQuestion = (text: string) => {
  ApplicationService.createQuestion(text, (err) => { });
}
const updateQuestion: (question: Question, newText: string) => ApplicationAction = (question: Question, newText: string) => {
  let action: ApplicationAction;
  if (question.text === newText) {
    action = {
      type: QUESTION_UPDATE_SUCCESS,
      question
    };
  } else {
    let q = {
      qid: question.qid,
      active: question.active,
      text: newText,
      changed: question.changed,
      deleted: question.deleted
    };
    action = {
      type: QUESTION_UPDATE_INITIATED,
      question: q
    };

  }
  return action;
};

const deleteQuestion: (question: Question) => ApplicationAction = (question: Question) => {
  const action: ApplicationAction = {
    type: QUESTION_UPDATE_INITIATED,
    question: Object.assign({}, question, { deleted: 1 })
  };

  return action;
};

const editQuestion = (index: number) => {
  const action = {
    type: EDIT_QUESTION,
    index
  };
  store.dispatch(action);
};
const QuestionManagerImpl = (props: QuestionMangerProps) => (
  <div className="col-md-6">
    <div className="panel">
      <h2 className="panel__header">Questions</h2>
      <div className="panel__content">

        <QuestionInput buttonEnabled={true} buttonLabel="Create" onClick={(value) => createQuestion(value)}></QuestionInput>
        <ul>
          {
            props.questions.map((q, i) => {
              return i === props.editIndex
                ? <li key={q.qid} ><QuestionInput buttonEnabled={true} buttonLabel="Update" defaultValue={q.text} onClick={(value) => props.actions.updateQuestion(q, value)}></QuestionInput></li>
                : <li key={q.qid}>
                  <div>
                    {q.text}
                  </div>
                  <RaisedButton
                    label="Edit"
                    onClick={() => editQuestion(i)}
                    style={buttonStyle} />
                  <RaisedButton
                    primary={true}
                    label="Add"
                    disabled={q.active}
                    onClick={() => props.actions.addToTemplate(q.qid)}
                    style={buttonStyle} />
                  <RaisedButton
                    secondary={true}
                    label="Delete"
                    disabled={q.active}
                    onClick={() => props.actions.deleteQuestion(q)}
                    style={buttonStyle} />
                </li>;
            })
          }
        </ul>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: State) => {
  return {
    questions: state.app.application.questions || [],
    editIndex: state.app.application.editQuestionIndex
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators({
      updateQuestion,
      deleteQuestion,
      addToTemplate: (qid: Question) => ({
        type: ADD_QUESTION_TO_TEMPLATE,
        qid
      }),
    }, dispatch)
  }
};


const QuestionManager = connect(mapStateToProps, mapDispatchToProps)(QuestionManagerImpl);

const ApplicationSettingsImpl = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="container">
    <div className="row">
      <QuestionManager></QuestionManager>
      <ApplicationTemplate></ApplicationTemplate>
    </div>
  </div>

);

interface ApplicationTemplateProps {
  questions: Question[];
  actions: {
    removeFromTemplate: (question: Question) => RemoveQuestionFromTemplateAction;
    moveUp: (question: Question) => MoveTemplateQuestionUpAction;
    moveDown: (question: Question) => MoveTemplateQuestionDownAction;
    save: (questions: Question[]) => InitializeApplicationTemplateSaveAction;
  }
}

const ApplicationTemplateImpl: React.StatelessComponent<ApplicationTemplateProps> = (props: ApplicationTemplateProps) => {
  return (
    <div className="col-md-6">
      <div className="panel">
        <h2 className="panel__header">Template</h2>
        <div className="panel__content">
          <ul>
            {
              props.questions.map((q, i) => {
                return (
                  <li key={q.qid}>
                    <div>
                      {q.text}
                    </div>
                    <RaisedButton
                      label="Up"
                      disabled={i === 0}
                      onClick={() => props.actions.moveUp(q.qid)}
                      style={buttonStyle} />
                    <RaisedButton
                      label="Down"
                      disabled={i === props.questions.length - 1}
                      onClick={() => props.actions.moveDown(q.qid)}
                      style={buttonStyle} />
                    <RaisedButton
                      secondary={true}
                      label="Remove"
                      onClick={() => props.actions.removeFromTemplate(q.qid)}
                      style={buttonStyle} />
                  </li>
                )
              })
            }
          </ul>

        </div>
        <button className="panel__button panel__button--action" onClick={() => props.actions.save(props.questions)}>Save</button>
      </div>
    </div>
  );
};

const mapStateToProps2 = (state: State) => {
  const templateQuestionIds = state.app.application.templateQuestions || [];
  let map = {};
  state.app.application.questions.forEach(q => map[q.qid] = q);
  return {
    questions: templateQuestionIds.map(qid => map[qid])
  };
};

const mapDispatchToProps2 = (dispatch: any) => {
  return {
    actions: bindActionCreators({
      removeFromTemplate: (qid: Question) => ({
        type: REMOVE_QUESTION_FROM_TEMPLATE,
        qid
      }),
      moveUp: (qid: Question) => ({
        type: MOVE_TEMPLATE_QUESTION_UP,
        qid
      }),
      moveDown: (qid: Question) => ({
        type: MOVE_TEMPLATE_QUSTION_DOWN,
        qid
      }),
      save: (questions: Question[]) => ({
        type: INIT_APPLICATION_TEMPLATE_SAVE,
        qids: questions.map(q => q.qid)
      })
    }, dispatch)
  };
};


const ApplicationTemplate = connect(mapStateToProps2, mapDispatchToProps2)(ApplicationTemplateImpl);

export const ApplicationSettings = ApplicationSettingsImpl;//connect(mapStateToProps)(ApplicationSettingsImpl);
