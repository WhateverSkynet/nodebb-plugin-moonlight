import * as BattleNetData from "../battlenet/data";
import * as app from "../app";

export const appReducer = (state: app.AppState, action: app.Action) => {
  if (state === undefined) {
    state = {
      data: {
        classes: BattleNetData.CLASSES,
        realms: ["zzzz"],//]BattleNetData.REALMS,
        questions: BattleNetData.QUESTIONS
      },
      filters: {
        rank: {}
      }
    };
  }
  switch (action.type) {
    case "TOGGLE_RANK_FILTER":
      let ranks:any = {};
      let keys: any[];

      if (state.filters.rank[action.value]) {
        keys = Object.keys(state.filters.rank)
        .filter(key => key !== action.value)       
      } else {
        keys = Object.keys(state.filters.rank);
        keys.push(action.value);        
      }

      keys.forEach(key => ranks[key] = true);
      return {
        data: state.data,
        filters:{
          rank: ranks
        }
      };
    default:
      return state;
  }
};


const recruitment = (state: any = {}, action: app.Action) => {

};