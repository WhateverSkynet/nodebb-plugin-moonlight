import { rosterReducer } from './roster';
import { Action, TOGGLE_RANK_FILTER } from '../../actions';


jest.dontMock('./roster');

const defaultState = {
    characters: [],
    filters: {
        rank: {
            "2": true,
            "5": true,
            "6": true,
            "7": true
        },
        sortBy: "rank",
        sortDirection: "ASC",
        charClass: {}
    }
};

const rank1Toggled = {
    characters: [],
    filters: {
        rank: {
            "1": true,
            "2": true,
            "5": true,
            "6": true,
            "7": true
        },
        sortBy: "rank",
        sortDirection: "ASC",
        charClass: {}
    }
};

describe('roster reducer', () => {
    it('should return the initial state', () => {
        expect(
            rosterReducer(undefined, Action)
        ).toEqual(defaultState);
    });

    it('should handle TOGGLE_RANK_FILTER on', () => {
        expect(
            rosterReducer(defaultState, {
                type: TOGGLE_RANK_FILTER,
                rank: 1
            })
        ).toEqual(rank1Toggled);
    });

    it('should handle TOGGLE_RANK_FILTER off', () => {
        expect(
            rosterReducer(rank1Toggled, {
                type: TOGGLE_RANK_FILTER,
                rank: 1
            })
        ).toEqual(defaultState);
    });

});