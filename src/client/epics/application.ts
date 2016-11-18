import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { GetQuestionsAction, GET_QUESTIONS, Action, QUESTION_LIST_UPDATED, QuestionsListUpdatedAction, QUESTION_UPDATE_INITIATED, QuestionUpdateInitiateAction, ApplicationAction, GET_APPLICATION_QUESTIONS_INIT, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS, INIT_APPLICATION_TEMPLATE_SAVE, InitializeApplicationTemplateSaveAction, GET_APPLICATION_TEMPLATE_SUCCESS, AJAXIFY_NEW_APPLICATION, SaveApplication, SAVE_APPLICATION, SaveApplicationAction, SAVE_APPLICATION_SUCCESS } from './../../actions';
import { applyMiddleware } from 'redux';
import { Socket } from './helpers';
import { State } from '../states/state';
import { store } from '../index';
import { INITIALIZE_REDUX_FORM, SUBMIT_APPLICATION, START_SUBMIT_REDUX_FORM, ReduxFormAction, END_SUBMIT_REDUX_FORM, ReplyToApplicationAction, REPLY_TO_APPLICATION_SUCCESS, REPLY_TO_APPLICATION, QUESTION_UPDATE_SUCCESS, DeleteApplicationAction, DELETE_APPLICATION, DELETE_APPLICATION_SUCCESS } from '../../actions';


export const getQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(GET_QUESTIONS)
    .mergeMap(action => Socket
      .emit({ event: 'plugins.ml.application.getQuestions' })
      .map(data => ({
        type: QUESTION_LIST_UPDATED,
        questions: data
      }))
    // .catch(err => console.log(err))
    );


export const getTemplateQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(GET_APPLICATION_QUESTIONS_INIT)
    .mergeMap(action => Socket
      .emit({ event: 'plugins.ml.application.getTemplateQuestions' })
      .map(data => ({
        type: GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS,
        qids: data
      }))
    //  .catch(err => console.log(err))
    );

export const getApplicationTemplateEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(AJAXIFY_NEW_APPLICATION)
    .mergeMap(action => Socket
      .emit({ event: 'plugins.ml.application.getApplicationTemplate' })
      .flatMap(data =>
        Observable.concat(
          // Form needs to be initilized first with correct values else question inputs will be empty. TODO: find better solution.
          Observable.of({
            type: INITIALIZE_REDUX_FORM,
            meta: { form: 'application' },
            payload: {
              characters: data.characters,
              questions: data.questions
            }
          }),
          Observable.of({
            type: GET_APPLICATION_TEMPLATE_SUCCESS,
            template: data
          })
        )
      )
    // .catch(err => console.log(err))
    );


// TODO: make this private
export const getApplicationForm = (state: State) => {
  const form = state.form.application;
  const payload = Object.assign({}, state.app.application.template);
  payload.characters = [...form.values.characters];
  for (let i = 0; i < payload.questions.length; i++) {
    if (form.values && form.values.questions && form.values.questions.length > i) {
      payload.questions[i].value = form.values.questions[i] && form.values.questions[i].value;
    }
  }
  return payload;
};

export const saveApplication: Epic<ApplicationAction> = action$ =>
  action$.ofType(SAVE_APPLICATION)
    .mergeMap((action: SaveApplicationAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.saveApplication', payload: getApplicationForm(store.getState()) })
        .map(data => ({
          type: SAVE_APPLICATION_SUCCESS,
          template: data
        })) //TODO: can this be done better?
      // .catch((err: any) => {
      //   console.log(err);
      //   return {
      //     type: ''
      //    };
      // })
    }
    );

export const deleteApplication: Epic<ApplicationAction> = action$ =>
  action$.ofType(DELETE_APPLICATION)
    .mergeMap((action: DeleteApplicationAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.deleteApplication', payload: action.payload })
        .map((payload: { appId: number }) => ({
          type: DELETE_APPLICATION_SUCCESS,
          payload
        })) //TODO: can this be done better?
      // .catch((err: any) => {
      //   console.log(err);
      //   return {
      //     type: ''
      //    };
      // })
    }
    );

export const replyToApplication: Epic<ApplicationAction> = action$ =>
  action$.ofType(REPLY_TO_APPLICATION)
    .mergeMap((action: ReplyToApplicationAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.createReply', payload: action.payload.reply })
        .map(data => ({
          type: REPLY_TO_APPLICATION_SUCCESS,
          template: data
        })) //TODO: can this be done better?
      // .catch((err: any) => {
      //   console.log(err);
      //   return {
      //     type: ''
      //    };
      // })
    }
    );


// Just catch errors. updates are broadcasted.
export const updateQuestion: Epic<ApplicationAction> = action$ =>
  action$.ofType(QUESTION_UPDATE_INITIATED)
    .mergeMap((action: QuestionUpdateInitiateAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.updateQuestion', payload: action.question })
        .map(data => Action);
      //  ({
      //   type: QUESTION_UPDATE_SUCCESS,
      //   question: data
      // })) //TODO: can this be done better?
      //   .catch(err => console.log(err))
    }
    );

export const updateTemplateQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(INIT_APPLICATION_TEMPLATE_SAVE)
    .mergeMap((action: InitializeApplicationTemplateSaveAction) => Socket
      .emit({ event: 'plugins.ml.application.updateTemplateQuestions', payload: action.qids })
      .map(data => Action) //TODO: can this be done better?
    //.catch(err => console.log(err))
    );


