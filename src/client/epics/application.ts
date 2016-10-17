import { Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { GetQuestionsAction, GET_QUESTIONS, Action, QUESTION_LIST_UPDATED, QuestionsListUpdatedAction, QUESTION_UPDATE_INITIATED, QuestionUpdateInitiateAction, ApplicationAction, GET_APPLICATION_QUESTIONS_INIT, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS, INIT_APPLICATION_TEMPLATE_SAVE, InitializeApplicationTemplateSaveAction, GET_APPLICATION_TEMPLATE_SUCCESS, AJAXIFY_NEW_APPLICATION, SaveApplication, SAVE_APPLICATION, SaveApplicationAction, SAVE_APPLICATION_SUCCESS } from './../../actions';
import { applyMiddleware } from 'redux';
import { Socket } from './helpers';


export const getQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(GET_QUESTIONS)
    .mergeMap<ApplicationAction>(action => Socket
      .emit({ event: 'plugins.ml.application.getQuestions' })
      .map(data => ({
        type: QUESTION_LIST_UPDATED,
        questions: data
      }))
     // .catch(err => console.log(err))
    );


export const getTemplateQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(GET_APPLICATION_QUESTIONS_INIT)
    .mergeMap<ApplicationAction>(action => Socket
      .emit({ event: 'plugins.ml.application.getTemplateQuestions' })
      .map(data => ({
        type: GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS,
        qids: data
      }))
    //  .catch(err => console.log(err))
    );

export const getApplicationTemplateEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(AJAXIFY_NEW_APPLICATION)
    .mergeMap<ApplicationAction>(action => Socket
      .emit({ event: 'plugins.ml.application.getApplicationTemplate' })
      .map(data => ({
        type: GET_APPLICATION_TEMPLATE_SUCCESS,
        template: data
      }))
     // .catch(err => console.log(err))
    );


export const saveApplication: Epic<ApplicationAction> = action$ =>
  action$.ofType(SAVE_APPLICATION)
    .mergeMap<ApplicationAction>((action: SaveApplicationAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.saveApplication', payload: action.template })
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

// Just catch errors. updates are broadcasted.
export const updateQuestion: Epic<ApplicationAction> = action$ =>
  action$.ofType(QUESTION_UPDATE_INITIATED)
    .mergeMap<ApplicationAction>((action: QuestionUpdateInitiateAction) => {
      return Socket
        .emit({ event: 'plugins.ml.application.updateQuestion', payload: action.question })
        .map(data => Action) //TODO: can this be done better?
     //   .catch(err => console.log(err))
    }
    );

export const updateTemplateQuestionsEpic: Epic<ApplicationAction> = action$ =>
  action$.ofType(INIT_APPLICATION_TEMPLATE_SAVE)
    .mergeMap<ApplicationAction>((action: InitializeApplicationTemplateSaveAction) => Socket
      .emit({ event: 'plugins.ml.application.updateTemplateQuestions', payload: action.qids })
      .map(data => Action) //TODO: can this be done better?
      //.catch(err => console.log(err))
    );


