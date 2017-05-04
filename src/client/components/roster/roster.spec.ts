import { mapStateToProps, getProperty } from './roster';

jest.dontMock('./roster');

const defaultState = {
  ajaxify: {
    roster: []
  },
  app: {
    filters: {
      rank: {
        '2': true,
        '5': true,
        '6': true,
        '7': true
      },
      sortBy: 'rank',
      sortDirection: 'ASC',
    },
  },
};

describe('roster filter/sort', () => {
  it('should return the initial state', () => {
    expect(1).toEqual(1);
  });
});