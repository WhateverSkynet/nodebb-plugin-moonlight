import { reducers } from './application';
import { Action, QUESTION_UPDATE_INITIATED, EDIT_QUESTION, ADD_QUESTION_TO_TEMPLATE, REMOVE_QUESTION_FROM_TEMPLATE, QUESTION_CREATED, QUESTION_LIST_UPDATED, QUESTION_UPDATE_SUCCESS, GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS } from '../../../actions';

jest.dontMock('./application');

describe('edit question index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.editQuestionIndex(undefined, Action)
    ).toEqual(-1);
  });

  it('should change index on edit action', () => {
    const action = {
      type: EDIT_QUESTION,
      index: 3,
    };
    expect(
      reducers.editQuestionIndex(-1, action)
    ).toEqual(3);
  });

  it('should reset on question update', () => {
    const action = {
      type: QUESTION_UPDATE_INITIATED,
      question: {},
    };
    expect(
      reducers.editQuestionIndex(3, action)
    ).toEqual(-1);
  });

});

describe('questions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers.questions(undefined, Action)
    ).toEqual([]);
  });

  it('should add question', () => {
    const initialState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
    ];
    const question = {
      qid: 2,
      text: 'question 2',
    };
    const action = {
      type: QUESTION_CREATED,
      question,
    };
    const resultState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      question,
    ];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });

  it('should change active status to true', () => {
    const initialState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    const action = {
      type: ADD_QUESTION_TO_TEMPLATE,
      qid: 1,
    };
    const resultState = [
      {
        qid: 1,
        active: true,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });

  it('should change active status to false', () => {
    const initialState = [
      {
        qid: 1,
        active: true,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    const action = {
      type: REMOVE_QUESTION_FROM_TEMPLATE,
      qid: 1,
    };
    const resultState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });

  it('should update question list', () => {
    const initialState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    const questions = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2 changed',
      },
      {
        qid: 3,
        active: false,
        text: 'question 3',
      },
    ];
    const action = {
      type: QUESTION_LIST_UPDATED,
      questions,
    };
    const resultState = [...questions];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });

  it('should ignore deleted questions', () => {
    const initialState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    const question = {
      qid: 2,
      active: false,
      deleted: 1,
      text: 'question 2',
    };
    const action = {
      type: QUESTION_UPDATE_SUCCESS,
      question,
    };
    const resultState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
    ];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });

  it('should upadate question data', () => {
    const initialState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      {
        qid: 2,
        active: false,
        text: 'question 2',
      },
    ];
    const question = {
      qid: 2,
      active: false,
      text: 'question 3',
    };
    const action = {
      type: QUESTION_UPDATE_SUCCESS,
      question,
    };
    const resultState = [
      {
        qid: 1,
        active: false,
        text: 'question 1',
      },
      question,
    ];
    expect(
      reducers.questions(initialState, action)
    ).toEqual(resultState);
  });


});

describe('questions tempalte reducer', () => {

  it('should return the initial state', () => {
    expect(
      reducers.templateQuestions(undefined, Action)
    ).toEqual([]);
  });

  it('should add question', () => {
    const action = {
      type: ADD_QUESTION_TO_TEMPLATE,
      qid: 1,
    };
    expect(
      reducers.templateQuestions([], action)
    ).toEqual([1]);
  });

    it('should not add duplicates', () => {
    const action = {
      type: ADD_QUESTION_TO_TEMPLATE,
      qid: 1,
    };
    expect(
      reducers.templateQuestions([1], action)
    ).toEqual([1]);
  });

  it('should remove question', () => {
    const action = {
      type: REMOVE_QUESTION_FROM_TEMPLATE,
      qid: 1,
    };
    expect(
      reducers.templateQuestions([1, 2, 3], action)
    ).toEqual([2, 3]);
    expect(
      reducers.templateQuestions([2, 1, 3], action)
    ).toEqual([2, 3]);
    expect(
      reducers.templateQuestions([2, 3, 1], action)
    ).toEqual([2, 3]);
    expect(
      reducers.templateQuestions([3, 2, 1, 4, 5], action)
    ).toEqual([3, 2, 4, 5]);
  });

  it('should update template', () => {
    const initialState = [1, 2, 3, 4, 5];
    const qids = [5, 4, 3, 2, 1];
    const action = {
      type: GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS,
      qids,
    };
    const resultState = [...qids];
    expect(
      reducers.templateQuestions(initialState, action)
    ).toEqual(resultState);
  });

});
