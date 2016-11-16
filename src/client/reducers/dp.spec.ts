import { byIdApplicationReducer, allIdApplicationReducer } from './db';
import { Action, AJAXIFY_APPLICATION_LIST, AjaxifyApplicationListAction, AJAXIFY_APPLICATION } from '../../actions';


jest.dontMock('./db');

const defaultState = {}

const listAction: AjaxifyApplicationListAction = {
  type: AJAXIFY_APPLICATION_LIST,
  payload: {
    applications: [
      {
        deleted: 0,
        status: 0,
        appId: 222,
        changed: 1477521582793,
        characters: [
          {
            guid: "0"
          }
        ],
        questions: [
          {
            qid: 1,
            text: "Why do you choose to play your class and are you comfortable with different specializations?",
            value: null
          },
        ],
        uid: 1
      }
    ]
  }
};

const appAction = {
  type: AJAXIFY_APPLICATION,
  payload: {
    application: {
      deleted: 0,
      status: 0,
      appId: 222,
      changed: 1477521582793,
      characters: [
        {
          guid: "0"
        }
      ],
      questions: [
        {
          qid: 1,
          text: "Why do you choose to play your class and are you comfortable with different specializations?",
          value: null
        },
      ],
      uid: 1
    },
    actions: []
  }
};


const afterListAction = {
  "222": {
    deleted: 0,
    status: 0,
    appId: 222,
    changed: 1477521582793,
    characters: [
      {
        guid: "0"
      }
    ],
    questions: [
      {
        qid: 1,
        text: "Why do you choose to play your class and are you comfortable with different specializations?",
        value: null
      },
    ],
    uid: 1
  }
};

describe('allIds reducer', () => {
  it('should return the initial state', () => {
        expect(
            byIdApplicationReducer(undefined, Action)
        ).toEqual({});
    });

    it('should handle AJAXIFY_APPLICATION_LIST on', () => {
        expect(
            byIdApplicationReducer(defaultState, listAction)
        ).toEqual(afterListAction);
         expect(
            byIdApplicationReducer(defaultState, appAction)
        ).toEqual(afterListAction);

    });

});

describe('byId reducer', () => {
  it('should return the initial state', () => {
        expect(
            allIdApplicationReducer(undefined, Action)
        ).toEqual([]);
    });

    it('should handle AJAXIFY_APPLICATION_LIST on', () => {
        expect(
            allIdApplicationReducer([], listAction)
        ).toEqual([222]);
          expect(
            allIdApplicationReducer([], appAction)
        ).toEqual([222]);
    }); 

});
