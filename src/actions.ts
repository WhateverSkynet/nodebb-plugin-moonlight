import { BlizzardSettingsState } from './client/states/admin/blizzard-settings';
import { Application } from './models/application';
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
  application: Application;
}

export type AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export const AJAXIFY_RECRUITMENT: AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export type AjaxifyRecruitmentAction = {
  type: AjaxifyRecruitment;
  classes: Recruitment.Class[]
}

export type AjaxifyChangeRecruitmentStatus = "@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS";
export const AJAXIFY_CHANGE_RECRUITMENT_STATUS: AjaxifyChangeRecruitmentStatus = "@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS";
export type AjaxifyChangeRecruitmentStatusAction = {
  type: AjaxifyChangeRecruitmentStatus;
  class: string;
  spec: string;
  status: string;
}


export type AjaxifyAction = AjaxifyRosterAction
  | AjaxifyChangeRecruitmentStatusAction
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

export type ToggleClassFilter = "@mnl/roster/CLASS_TOGGLE";
export const TOGGLE_CLASS_FILTER: ToggleClassFilter = "@mnl/roster/CLASS_TOGGLE";
export type ToggleClassFilterAction = {
  type: ToggleClassFilter;
  charClass: number;
};

export type SortRosterBy = "@mnl/roster/SORT_BY";
export const SORT_ROSTER_BY: SortRosterBy = "@mnl/roster/SORT_BY";
export type SortRosterByAction = {
  type: SortRosterBy;
  propertyName: string;
};

export type RosterAction = SortRosterByAction | ToogleRankFilterAction | ToggleClassFilterAction | Action;

// Admin Actions

export type AdminGetSettings = "@mnl/admin/GET_SETTINGS";
export const ADMIN_GET_SETTINGS: AdminGetSettings = "@mnl/admin/GET_SETTINGS";
export type AdminGetSettingsAction = {
  type: AdminGetSettings;
}

export type AdminSetBlizzardSettings = "@mnl/admin/SET_BLIZZARD_SETTING";
export const ADMIN_SET_BLIZZARD_SETTINGS: AdminSetBlizzardSettings = "@mnl/admin/SET_BLIZZARD_SETTING";
export type AdminSetBlizzardSettingsAction = {
  type: AdminSetBlizzardSettings;
  settings: BlizzardSettingsState;
}



export type AdminAction = AdminGetSettingsAction | AdminSetBlizzardSettingsAction | Action;