import { BlizzardSettingsState } from './client/states/admin/blizzard-settings';
import { Application, Question, ApplicationTemplate } from './models/application';
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
};

export type AjaxifyNewApplication = "@mnl/ajaxify/NEW_APPLICATION";
export const AJAXIFY_NEW_APPLICATION: AjaxifyNewApplication = "@mnl/ajaxify/NEW_APPLICATION";

export type AjaxifyNewApplicationAction = {
  type: AjaxifyNewApplication;
  application: Application;
};

export type AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export const AJAXIFY_RECRUITMENT: AjaxifyRecruitment = "@mnl/ajaxify/RECRUITMENT";
export type AjaxifyRecruitmentAction = {
  type: AjaxifyRecruitment;
  classes: Recruitment.Class[]
};

export type AjaxifyChangeRecruitmentStatus = "@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS";
export const AJAXIFY_CHANGE_RECRUITMENT_STATUS: AjaxifyChangeRecruitmentStatus = "@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS";
export type AjaxifyChangeRecruitmentStatusAction = {
  type: AjaxifyChangeRecruitmentStatus;
  class: string;
  spec: string;
  status: string;
};


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
};

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
};

export type RouterAction = LocationChangedAction | Action;

// Roster Actions

export type ToogleRankFilter = "@mnl/roster/RANK_TOGGLE";
export const TOGGLE_RANK_FILTER: ToogleRankFilter = "@mnl/roster/RANK_TOGGLE";
export type ToogleRankFilterAction = {
  type: ToogleRankFilter;
  rank: number;
};

export type RosterAction = ToogleRankFilterAction | Action;

// Admin Actions

export type AdminGetSettings = "@mnl/admin/GET_SETTINGS";
export const ADMIN_GET_SETTINGS: AdminGetSettings = "@mnl/admin/GET_SETTINGS";
export type AdminGetSettingsAction = {
  type: AdminGetSettings;
};

export type AdminSetBlizzardSettings = "@mnl/admin/SET_BLIZZARD_SETTING";
export const ADMIN_SET_BLIZZARD_SETTINGS: AdminSetBlizzardSettings = "@mnl/admin/SET_BLIZZARD_SETTING";
export type AdminSetBlizzardSettingsAction = {
  type: AdminSetBlizzardSettings;
  settings: BlizzardSettingsState;
};

export type AdminAction = AdminGetSettingsAction | AdminSetBlizzardSettingsAction | Action;

// Application Actions

export type GetQuestions = "@mnl/application/GET_QUESTIONS";
export const GET_QUESTIONS: GetQuestions = "@mnl/application/GET_QUESTIONS";
export type GetQuestionsAction = {
  type: GetQuestions;
};

export type QuestionsListUpdated = "@mnl/application/QUESTION_LIST_UPDATED";
export const QUESTION_LIST_UPDATED: QuestionsListUpdated = "@mnl/application/QUESTION_LIST_UPDATED";
export type QuestionsListUpdatedAction = {
  type: QuestionsListUpdated;
  questions: Question[];
};

export type QuestionCreated = "@mnl/application/QUESTION_CREATED";
export const QUESTION_CREATED: QuestionCreated = "@mnl/application/QUESTION_CREATED";
export type QuestionCreatedAction = {
  type: QuestionCreated;
  question: Question;
};

export type QuestionUpdateSuccess = "@mnl/application/QUESTION_UPDATE_SUCCESS";
export const QUESTION_UPDATE_SUCCESS: QuestionUpdateSuccess = "@mnl/application/QUESTION_UPDATE_SUCCESS";
export type QuestionUpdateSuccessAction = {
  type: QuestionUpdateSuccess;
  question: Question;
};

export type QuestionUpdatedInitiate = "@mnl/application/QUESTION_UPDATE_INITIATED";
export const QUESTION_UPDATE_INITIATED: QuestionUpdatedInitiate = "@mnl/application/QUESTION_UPDATE_INITIATED";
export type QuestionUpdateInitiateAction = {
  type: QuestionUpdatedInitiate;
  question: Question;
};

export type EditQuestion = "@mnl/application/EDIT_QUESTION";
export const EDIT_QUESTION: EditQuestion = "@mnl/application/EDIT_QUESTION";
export type EditQuestionAction = {
  type: EditQuestion;
  index: number;
};

export type AddQuestionToTemplate = "@mnl/application/ADD_QUESTION_TO_TEMPLATE";
export const ADD_QUESTION_TO_TEMPLATE: AddQuestionToTemplate = "@mnl/application/ADD_QUESTION_TO_TEMPLATE";
export type AddQuestionToTemplateAction = {
  type: AddQuestionToTemplate;
  question: number;
};

export type RemoveQuestionFromTemplate = "@mnl/application/REMOVE_QUESTION_FROM_TEMPLATE";
export const REMOVE_QUESTION_FROM_TEMPLATE: RemoveQuestionFromTemplate = "@mnl/application/REMOVE_QUESTION_FROM_TEMPLATE";
export type RemoveQuestionFromTemplateAction = {
  type: RemoveQuestionFromTemplate;
  question: number;
};

export type MoveTemplateQuestionUp = "@mnl/application/MOVE_TEMPLATE_QUESTION_UP";
export const MOVE_TEMPLATE_QUESTION_UP: MoveTemplateQuestionUp = "@mnl/application/MOVE_TEMPLATE_QUESTION_UP";
export type MoveTemplateQuestionUpAction = {
  type: MoveTemplateQuestionUp;
  question: number;
};

export type MoveTemplateQuestionDown = "@mnl/application/MOVE_TEMPLATE_QUESTION_DOWN";
export const MOVE_TEMPLATE_QUSTION_DOWN: MoveTemplateQuestionDown = "@mnl/application/MOVE_TEMPLATE_QUESTION_DOWN";
export type MoveTemplateQuestionDownAction = {
  type: MoveTemplateQuestionDown;
  question: number;
};

export type InitApplicationTemplateSave = "@mnl/application/INIT_APPLICATION_TEMPLATE_SAVE";
export const INIT_APPLICATION_TEMPLATE_SAVE: InitApplicationTemplateSave = "@mnl/application/INIT_APPLICATION_TEMPLATE_SAVE";
export type InitializeApplicationTemplateSaveAction = {
  type: InitApplicationTemplateSave;
  qids: number[];
};

export type ApplicationTemplateSaveSucceeded = "@mnl/application/APPLICATION_TEMPLATE_SAVE_SUCCEDED";
export const APPLICATION_TEMPLATE_SAVE_SUCCEDEED: ApplicationTemplateSaveSucceeded = "@mnl/application/APPLICATION_TEMPLATE_SAVE_SUCCEDED";
export type ApplicationTemplateSaveSuccededAction = {
  type: ApplicationTemplateSaveSucceeded;
  qids: number[];
};

export type GetApplicationTemplateQuestionsInit = "@mnl/application/GET_TEMPLATE_QUESTIONS";
export const GET_APPLICATION_QUESTIONS_INIT: GetApplicationTemplateQuestionsInit = "@mnl/application/GET_TEMPLATE_QUESTIONS";
export type GetApplicationTemplateQuestionsInitAction = {
  type: GetApplicationTemplateQuestionsInit;
};

export type GetApplicationTemplateQuestionsSuccess = "@mnl/application/GET_TEMPLATE_QUESTIONS_SUCCESS";
export const GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS: GetApplicationTemplateQuestionsSuccess = "@mnl/application/GET_TEMPLATE_QUESTIONS_SUCCESS";
export type GetApplicationTemplateQuestionsSuccessAction = {
  type: GetApplicationTemplateQuestionsSuccess;
  qids: number[];
};

export type GetApplicationTemplate = "@mnl/application/GET_TEMPLATE";
export const GET_APPLICATION_TEMPLATE: GetApplicationTemplate = "@mnl/application/GET_TEMPLATE";
export type GetApplicationTemplateAction = {
  type: GetApplicationTemplate;
};

export type GetApplicationTemplateSuccess = "@mnl/application/GET_TEMPLATE_SUCCESS";
export const GET_APPLICATION_TEMPLATE_SUCCESS: GetApplicationTemplateSuccess = "@mnl/application/GET_TEMPLATE_SUCCESS";
export type GetApplicationTemplateSuccessAction = {
  type: GetApplicationTemplateSuccess;
  template: ApplicationTemplate;
};

export type ApplicationQuestionValueChanged = "@mnl/application/QUESTION_VALUE_CHANGED";
export const APPLICATION_QUESTION_VALUE_CHANGED: ApplicationQuestionValueChanged = "@mnl/application/QUESTION_VALUE_CHANGED";
export type ApplicationQuestionValueChangedAction = {
  type: ApplicationQuestionValueChanged;
  qid: number;
  newValue: string;
};

export type SaveApplication = "@mnl/application/SAVE";
export const SAVE_APPLICATION: SaveApplication = "@mnl/application/SAVE";
export type SaveApplicationAction = {
  type: SaveApplication;
  template: ApplicationTemplate;
};

//TODO: figure how save app works
export type SaveApplicationSuccess = "@mnl/application/SAVE_SUCCESS";
export const SAVE_APPLICATION_SUCCESS: SaveApplicationSuccess = "@mnl/application/SAVE_SUCCESS";
export type SaveApplicationSuccessAction = {
  type: SaveApplicationSuccess;
  template: ApplicationTemplate;
};

export type AddApplicationCharacter = "@mnl/application/ADD_CHARACTER";
export const ADD_APPLICATION_CHARACTER: AddApplicationCharacter = "@mnl/application/ADD_CHARACTER";
export type AddApplicationCharacterAction = {
  type: AddApplicationCharacter;
};

export type RemoveApplicationCharacter = "@mnl/application/REMOVE_CHARACTER";
export const REMOVE_APPLICATION_CHARACTER: RemoveApplicationCharacter = "@mnl/application/REMOVE_CHARACTER";
export type RemoveApplicationCharacterAction = {
  type: RemoveApplicationCharacter;
  guid: string;
};

export type ApplicationAction = GetQuestionsAction
  | QuestionsListUpdatedAction
  | QuestionUpdateInitiateAction
  | QuestionCreatedAction
  | QuestionUpdateSuccessAction
  | EditQuestionAction
  | AddQuestionToTemplateAction
  | RemoveQuestionFromTemplateAction
  | MoveTemplateQuestionUpAction
  | MoveTemplateQuestionDownAction
  | InitializeApplicationTemplateSaveAction
  | ApplicationTemplateSaveSuccededAction
  | GetApplicationTemplateQuestionsInitAction
  | GetApplicationTemplateQuestionsSuccessAction
  | GetApplicationTemplateAction
  | GetApplicationTemplateSuccessAction
  | ApplicationQuestionValueChangedAction
  | SaveApplicationAction
  | SaveApplicationSuccessAction
  | RemoveApplicationCharacterAction
  | AddApplicationCharacterAction
  | Action;
