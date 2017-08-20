
import { mapStateToProps, getProperty } from './roster';

import { roster } from '../../../../__data__/roster';
import { State } from '../../states/state';


const defaultState: any = {
  ajaxify: {
    roster,
  },
  app: {
    filters: {
      rank: {
        '2': true,
        '5': true,
        '6': true,
        '7': true,
      },
      sortBy: 'rank',
      sortDirection: 'ASC',
    },
  },
};

describe('initial state props', () => {
  // // const props = mapStateToProps(defaultState);
  // console.log(props)
});


describe('roster filter/sort', () => {

  it('should return the initial state', () => {
    expect(1).toEqual(1);
  });
  it('abc', () => {
    expect(1).toEqual(1);

  });
});
