import { RosterCharacter, CharacterClass } from './models/wow';
import { Recruitment } from "./models/recruitment";

export type Action = { type: "" };
export const Action: Action = { type: "" };

// Ajaxify actions

export type AjaxifyRoster = "@mnl/ajaxify/ROSTER";
export const AJAXIFY_ROSTER: AjaxifyRoster = "@mnl/ajaxify/ROSTER";
export type AjaxifyRosterAction = {
  type: AjaxifyRoster;
  characters: RosterCharacter[];
}

export type AjaxifyNewApplication = "@mnl/ajaxify/NEW_APPLICATION";
export const AJAXIFY_NEW_APPLICATION: AjaxifyNewApplication = "@mnl/ajaxify/NEW_APPLICATION";

export type AjaxifyNewApplicationAction = {
  type: AjaxifyNewApplication;
  application: any;
}

export type AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export const AJAXIFY_RECRUITMENT: AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export type AjaxifyRecruitmentAction = {
  type: AjaxifyRecruitment;
  classes: Recruitment.Class[]
}

export type AjaxifyAction = AjaxifyRosterAction
  | AjaxifyNewApplicationAction
  | AjaxifyRecruitmentAction
  | Action;

// WoW Actions

export type WoWData = "@mnl/wow/DATA";
export const WOW_DATA: WoWData = "@mnl/wow/DATA";
export type WoWDataAction = {
  type: WoWData;
  realms: string[];
  classes: CharacterClass[];
}

export type WoWActions = WoWDataAction
  | Action;

// Router Actions

export type LocationChanged = "@@router/LOCATION_CHANGED";
export const LOCATION_CHANGED: LocationChanged = "@@router/LOCATION_CHANGED";
export type LocationChangedAction = {
  type: LocationChanged;
  payload: {
    pathname: string;
  }
}

export type RouterAction = LocationChangedAction | Action;

// Roster Actions

export type ToogleRankFilter = "@mnl/roster/RANK_TOGGLE";
export const TOGGLE_RANK_FILTER: ToogleRankFilter = "@mnl/roster/RANK_TOGGLE";
export type ToogleRankFilterAction = {
  type: ToogleRankFilter;
  rank: number;
}

export type RosterAction = ToogleRankFilterAction | Action;