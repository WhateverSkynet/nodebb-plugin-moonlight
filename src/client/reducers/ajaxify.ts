
import { Action, Reducer } from "redux";
import { Question } from "../app";
import * as BattleNet from "../battlenet/index";

const AJAXIFY_UPDATE = "AJAXIFY_UPDATE";
const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

interface AjaxifyState {
    recruitment?: any;
    realms?: string[];
    characterClasses?: BattleNet.CharacterClass[];
    questions?: Question[];
    members?: Member[]
}

interface Member {
    character: any;
    audit: any;
}


interface AjaxifyAction extends Action {
    data?: any;
    type: any;
}


export const ajaxifyReducer = (state: AjaxifyState, action: AjaxifyAction) => {
    // if (!state) {
    //     state = {}
    // }
    // switch (action.type) {
    //     case AJAXIFY_UPDATE: state = action.ajaxify.data;
    // }
    if (action.type === LOCATION_CHANGE) {
        let newSate: AjaxifyState = {}
        newSate.recruitment = window.ajaxify.data.recruitment;
        newSate.realms = window.ajaxify.data.realms;
        newSate.characterClasses = window.ajaxify.data.classes;
        newSate.questions = window.ajaxify.data.questions;
        newSate.members = window.ajaxify.data.members.sort((a:any, b:any) => a.rank - b.rank);
        return newSate;
    }
    if (!state) {
        return {};
    }
    return state;


}

// const recruitment = (state: any, action: AjaxifyAction) => {
//     if (!state) {
//         state = [];
//     }
//     switch (action.type) {
//         case AJAXIFY_UPDATE: return action.ajaxify.data.recruitment;
//         default: return state;
//     }
// }