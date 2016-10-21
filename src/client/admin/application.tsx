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

interface QuestionInputProps {
  onClick: (value: string) => void;
  buttonEnabled: boolean;
  buttonLabel: string;
  defaultValue?: string;
}

const QuestionInput: React.StatelessComponent<QuestionInputProps> = (props: QuestionInputProps) => {
  let input;
  return (
    <div className="mui-textfield mui-textfield--float-label">
      <input ref={node => {
        input = node;
      } }
        type="text"
        defaultValue={props.defaultValue || ""}
        />
      <label>Question Text</label>
      <button className="mui-btn  mui-btn--primary"
        disabled={!props.buttonEnabled}
        onClick={() => {
          props.onClick(input.value);
          input.value = ""
        } } >{props.buttonLabel}</button>
    </div>
  );
};

interface QuestionMangerProps {
  questions: Question[];
  editIndex: number;
  actions: {
    updateQuestion: (question: Question, newText: string) => ApplicationAction;
    addToTemplate: (question: Question) => AddQuestionToTemplateAction;
  }
}

const updateQuestionText = (question: Question, newText: string) => {

};

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

const editQuestion = (index: number) => {
  const action = {
    type: EDIT_QUESTION,
    index
  };
  store.dispatch(action);
};
const QuestionManagerImpl= (props: QuestionMangerProps) => (
  <div className="mui-col-md-12">
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
              <button className="mui-btn  mui-btn--primary" onClick={() => editQuestion(i)} >Edit</button>
              <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.addToTemplate(q.qid) } >Add</button>
            </li>;
        })
      }
    </ul>
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
       addToTemplate: (question: Question) => ({
        type: ADD_QUESTION_TO_TEMPLATE,
        question
      }),
    }, dispatch)
  }
};


const QuestionManager = connect(mapStateToProps, mapDispatchToProps)(QuestionManagerImpl);

const ApplicationSettingsImpl = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mui-row">

    <QuestionManager></QuestionManager>
    <ApplicationTemplate></ApplicationTemplate>
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
    <div className="mui-col-md-12">
      <h3>Template <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.save(props.questions) } >Save</button></h3>
      <ul>
        {
          props.questions.map((q, i) => {
            return (
              <li key={q.qid}>
                <div>
                  {q.text}
                </div>
                <button className="mui-btn  mui-btn--primary" disabled={i === 0} onClick={() => props.actions.moveUp(q.qid) } >Up</button>
                <button className="mui-btn  mui-btn--primary" disabled={i === props.questions.length - 1} onClick={() => props.actions.moveDown(q.qid) } >Down</button>
                <button className="mui-btn  mui-btn--primary" onClick={() => props.actions.removeFromTemplate(q.qid) } >Remove</button>
              </li>
            )
          })
        }
      </ul>
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
      removeFromTemplate: (question: Question) => ({
        type: REMOVE_QUESTION_FROM_TEMPLATE,
        question
      }),
      moveUp: (question: Question) => ({
        type: MOVE_TEMPLATE_QUESTION_UP,
        question
      }),
      moveDown: (question: Question) => ({
        type: MOVE_TEMPLATE_QUSTION_DOWN,
        question
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
