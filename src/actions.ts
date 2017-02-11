import { BlizzardSettingsState } from './client/states/admin/blizzard-settings';
import { Question, ApplicationTemplate, ApplicationCharacter, ApplicationReply } from './models/application';
import { RosterCharacter, CharacterClass } from './models/wow';
import { Recruitment } from "./models/recruitment";
import { BlogPostEntity } from './models/blog';

export type Action = { type: "" };
export const Action: Action = { type: '' };

// Ajaxify actions

export type AjaxifyRoster = '@mnl/ajaxify/ROSTER';
export const AJAXIFY_ROSTER: AjaxifyRoster = '@mnl/ajaxify/ROSTER';
export type AjaxifyRosterAction = {
  type: AjaxifyRoster;
  characters: RosterCharacter[];
};

export type AjaxifyNewApplication = '@mnl/ajaxify/NEW_APPLICATION';
export const AJAXIFY_NEW_APPLICATION: AjaxifyNewApplication = '@mnl/ajaxify/NEW_APPLICATION';

export type AjaxifyNewApplicationAction = {
  type: AjaxifyNewApplication;
  application: ApplicationTemplate;
};

export type AjaxifyRecruitment = '@mnl/ajaxify/RECRUITMENT';
export const AJAXIFY_RECRUITMENT: AjaxifyRecruitment = '@mnl/ajaxify/RECRUITMENT';
export type AjaxifyRecruitmentAction = {
  type: AjaxifyRecruitment;
  classes: Recruitment.RecruitmentItem[]
}

export type AjaxifyChangeRecruitmentStatus = '@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS';
export const AJAXIFY_CHANGE_RECRUITMENT_STATUS: AjaxifyChangeRecruitmentStatus = '@mnl/ajaxify/CHANGE_RECRUITMENT_STATUS';
export type AjaxifyChangeRecruitmentStatusAction = {
  type: AjaxifyChangeRecruitmentStatus;
  index: number;
  status: Recruitment.Status;
}

export type AjaxifyApplicationList = '@mnl/ajaxify/APPLICATION_LIST';
export const AJAXIFY_APPLICATION_LIST: AjaxifyApplicationList = '@mnl/ajaxify/APPLICATION_LIST';
export type AjaxifyApplicationListAction = {
  type: AjaxifyApplicationList;
  payload: {
    applications: ApplicationTemplate[]
  };
};

export type AjaxifyApplication = '@mnl/ajaxify/APPLICATION';
export const AJAXIFY_APPLICATION: AjaxifyApplication = '@mnl/ajaxify/APPLICATION';
export type AjaxifyApplicationAction = {
  type: AjaxifyApplication;
  payload: {
    application: ApplicationTemplate,
    actions: string[]
  };
};

export type AjaxifyBlog = '@mnl/ajaxify/BLOG';
export const AJAXIFY_BLOG: AjaxifyBlog = '@mnl/ajaxify/BLOG';
export type AjaxifyBlogAction = {
  type: AjaxifyBlog;
  payload: {
    posts: BlogPostEntity[];
  };
};

export type AjaxifyAction = AjaxifyRosterAction
  | AjaxifyChangeRecruitmentStatusAction
  | AjaxifyNewApplicationAction
  | AjaxifyRecruitmentAction
  | AjaxifyApplicationListAction
  | AjaxifyApplicationAction
  | AjaxifyBlogAction
  | Action;

// WoW Actions

export type WoWData = '@mnl/wow/DATA';
export const WOW_DATA: WoWData = '@mnl/wow/DATA';
export type WoWDataAction = {
  type: WoWData;
  realms: string[];
  classes: CharacterClass[];
};

export type WoWActions = WoWDataAction
  | Action;

// Router Actions

export type LocationChanged = '@@router/LOCATION_CHANGED';
export const LOCATION_CHANGED: LocationChanged = '@@router/LOCATION_CHANGED';
export type LocationChangedAction = {
  type: LocationChanged;
  payload: {
    pathname: string;
  }
};

export type RouterAction = LocationChangedAction | Action;

// Roster Actions

export type ToogleRankFilter = '@mnl/roster/RANK_TOGGLE';
export const TOGGLE_RANK_FILTER: ToogleRankFilter = '@mnl/roster/RANK_TOGGLE';
export type ToogleRankFilterAction = {
  type: ToogleRankFilter;
  rank: number;
};

export type ToggleClassFilter = '@mnl/roster/CLASS_TOGGLE';
export const TOGGLE_CLASS_FILTER: ToggleClassFilter = '@mnl/roster/CLASS_TOGGLE';
export type ToggleClassFilterAction = {
  type: ToggleClassFilter;
  charClass: number;
};

export type SortRosterBy = '@mnl/roster/SORT_BY';
export const SORT_ROSTER_BY: SortRosterBy = '@mnl/roster/SORT_BY';
export type SortRosterByAction = {
  type: SortRosterBy;
  propertyName: string;
};


export type RosterAction = SortRosterByAction | ToogleRankFilterAction | ToggleClassFilterAction | Action;

export type GetBlogPostsRequest = '@mnl/blog/GET_POSTS_REQUEST';
export const GET_BLOG_POSTS_REQUEST: GetBlogPostsRequest = '@mnl/blog/GET_POSTS_REQUEST';
export type GetBlogPostsRequestAction = {
  type: GetBlogPostsRequest;
};

export type GetBlogPostsSuccess = '@mnl/blog/GET_POSTS_SUCCESS';
export const GET_BLOG_POSTS_SUCCESS: GetBlogPostsSuccess = '@mnl/blog/GET_POSTS_SUCCESS';
export type GetBlogPostsSuccessAction = {
  type: GetBlogPostsSuccess;
  payload: {
    posts: BlogPostEntity[];
  }
};

export type BlogAction = GetBlogPostsRequestAction
| GetBlogPostsSuccessAction
| Action;

// Admin Actions

export type AdminGetSettings = '@mnl/admin/GET_SETTINGS';
export const ADMIN_GET_SETTINGS: AdminGetSettings = '@mnl/admin/GET_SETTINGS';
export type AdminGetSettingsAction = {
  type: AdminGetSettings;
};

export type AdminSetBlizzardSettings = '@mnl/admin/SET_BLIZZARD_SETTING';
export const ADMIN_SET_BLIZZARD_SETTINGS: AdminSetBlizzardSettings = '@mnl/admin/SET_BLIZZARD_SETTING';
export type AdminSetBlizzardSettingsAction = {
  type: AdminSetBlizzardSettings;
  settings: BlizzardSettingsState;
};

export type AdminCreateBlogPost = '@mnl/admin/CREATE_BLOG_POST';
export const ADMIN_CREATE_BLOG_POST: AdminCreateBlogPost = '@mnl/admin/CREATE_BLOG_POST';
export type AdminCreateBlogPostAction = {
  type: AdminCreateBlogPost;
};

export type AdminSelectBlogPost = '@mnl/admin/SELECT_BLOG_POST';
export const ADMIN_SELECT_BLOG_POST: AdminSelectBlogPost = '@mnl/admin/SELECT_BLOG_POST';
export type AdminSelectBlogPostAction = {
  type: AdminSelectBlogPost;
  payload: {
    id: number;
  };
};

export type AdminSaveBlogPost = '@mnl/admin/SAVE_BLOG_POST';
export const ADMIN_SAVE_BLOG_POST: AdminSaveBlogPost = '@mnl/admin/SAVE_BLOG_POST';
export type AdminSaveBlogPostAction = {
  type: AdminSaveBlogPost;
  payload: {
    post: BlogPostEntity;
  };
};

export type AdminSaveBlogPostSuccess = '@mnl/admin/SAVE_BLOG_POST_SUCCESS';
export const ADMIN_SAVE_BLOG_POST_SUCCESS: AdminSaveBlogPostSuccess = '@mnl/admin/SAVE_BLOG_POST_SUCCESS';
export type AdminSaveBlogPostSuccessAction = {
  type: AdminSaveBlogPostSuccess;
  payload: {
    post: BlogPostEntity;
  };
};


export type AdminAction = AdminGetSettingsAction
| AdminSetBlizzardSettingsAction
| AdminCreateBlogPostAction
| AdminSelectBlogPostAction
| AdminSaveBlogPostAction
| AdminSaveBlogPostSuccessAction
| Action;

// Application Actions

export type GetQuestions = '@mnl/application/GET_QUESTIONS';
export const GET_QUESTIONS: GetQuestions = '@mnl/application/GET_QUESTIONS';
export type GetQuestionsAction = {
  type: GetQuestions;
};

export type QuestionsListUpdated = '@mnl/application/QUESTION_LIST_UPDATED';
export const QUESTION_LIST_UPDATED: QuestionsListUpdated = '@mnl/application/QUESTION_LIST_UPDATED';
export type QuestionsListUpdatedAction = {
  type: QuestionsListUpdated;
  questions: Question[];
};

export type QuestionCreated = '@mnl/application/QUESTION_CREATED';
export const QUESTION_CREATED: QuestionCreated = '@mnl/application/QUESTION_CREATED';
export type QuestionCreatedAction = {
  type: QuestionCreated;
  question: Question;
};

export type QuestionUpdateSuccess = '@mnl/application/QUESTION_UPDATE_SUCCESS';
export const QUESTION_UPDATE_SUCCESS: QuestionUpdateSuccess = '@mnl/application/QUESTION_UPDATE_SUCCESS';
export type QuestionUpdateSuccessAction = {
  type: QuestionUpdateSuccess;
  question: Question;
};

export type QuestionUpdatedInitiate = '@mnl/application/QUESTION_UPDATE_INITIATED';
export const QUESTION_UPDATE_INITIATED: QuestionUpdatedInitiate = '@mnl/application/QUESTION_UPDATE_INITIATED';
export type QuestionUpdateInitiateAction = {
  type: QuestionUpdatedInitiate;
  question: Question;
};

export type EditQuestion = '@mnl/application/EDIT_QUESTION';
export const EDIT_QUESTION: EditQuestion = '@mnl/application/EDIT_QUESTION';
export type EditQuestionAction = {
  type: EditQuestion;
  index: number;
};

export type AddQuestionToTemplate = '@mnl/application/ADD_QUESTION_TO_TEMPLATE';
export const ADD_QUESTION_TO_TEMPLATE: AddQuestionToTemplate = '@mnl/application/ADD_QUESTION_TO_TEMPLATE';
export type AddQuestionToTemplateAction = {
  type: AddQuestionToTemplate;
  qid: number;
};

export type RemoveQuestionFromTemplate = '@mnl/application/REMOVE_QUESTION_FROM_TEMPLATE';
export const REMOVE_QUESTION_FROM_TEMPLATE: RemoveQuestionFromTemplate = '@mnl/application/REMOVE_QUESTION_FROM_TEMPLATE';
export type RemoveQuestionFromTemplateAction = {
  type: RemoveQuestionFromTemplate;
  qid: number;
};

export type MoveTemplateQuestionUp = '@mnl/application/MOVE_TEMPLATE_QUESTION_UP';
export const MOVE_TEMPLATE_QUESTION_UP: MoveTemplateQuestionUp = '@mnl/application/MOVE_TEMPLATE_QUESTION_UP';
export type MoveTemplateQuestionUpAction = {
  type: MoveTemplateQuestionUp;
  qid: number;
};

export type MoveTemplateQuestionDown = '@mnl/application/MOVE_TEMPLATE_QUESTION_DOWN';
export const MOVE_TEMPLATE_QUSTION_DOWN: MoveTemplateQuestionDown = '@mnl/application/MOVE_TEMPLATE_QUESTION_DOWN';
export type MoveTemplateQuestionDownAction = {
  type: MoveTemplateQuestionDown;
  qid: number;
};

export type InitApplicationTemplateSave = '@mnl/application/INIT_APPLICATION_TEMPLATE_SAVE';
export const INIT_APPLICATION_TEMPLATE_SAVE: InitApplicationTemplateSave = '@mnl/application/INIT_APPLICATION_TEMPLATE_SAVE';
export type InitializeApplicationTemplateSaveAction = {
  type: InitApplicationTemplateSave;
  qids: number[];
};

export type ApplicationTemplateSaveSucceeded = '@mnl/application/APPLICATION_TEMPLATE_SAVE_SUCCEDED';
export const APPLICATION_TEMPLATE_SAVE_SUCCEDEED: ApplicationTemplateSaveSucceeded = '@mnl/application/APPLICATION_TEMPLATE_SAVE_SUCCEDED';
export type ApplicationTemplateSaveSuccededAction = {
  type: ApplicationTemplateSaveSucceeded;
  qids: number[];
};

export type GetApplicationTemplateQuestionsInit = '@mnl/application/GET_TEMPLATE_QUESTIONS';
export const GET_APPLICATION_QUESTIONS_INIT: GetApplicationTemplateQuestionsInit = '@mnl/application/GET_TEMPLATE_QUESTIONS';
export type GetApplicationTemplateQuestionsInitAction = {
  type: GetApplicationTemplateQuestionsInit;
};

export type GetApplicationTemplateQuestionsSuccess = '@mnl/application/GET_TEMPLATE_QUESTIONS_SUCCESS';
export const GET_APPLICATION_TEMPLATE_QUESTIONS_SUCCESS: GetApplicationTemplateQuestionsSuccess = '@mnl/application/GET_TEMPLATE_QUESTIONS_SUCCESS';
export type GetApplicationTemplateQuestionsSuccessAction = {
  type: GetApplicationTemplateQuestionsSuccess;
  qids: number[];
};

export type GetApplicationTemplate = '@mnl/application/GET_TEMPLATE';
export const GET_APPLICATION_TEMPLATE: GetApplicationTemplate = '@mnl/application/GET_TEMPLATE';
export type GetApplicationTemplateAction = {
  type: GetApplicationTemplate;
};

export type GetApplicationTemplateSuccess = '@mnl/application/GET_TEMPLATE_SUCCESS';
export const GET_APPLICATION_TEMPLATE_SUCCESS: GetApplicationTemplateSuccess = '@mnl/application/GET_TEMPLATE_SUCCESS';
export type GetApplicationTemplateSuccessAction = {
  type: GetApplicationTemplateSuccess;
  template: ApplicationTemplate;
};

export type ApplicationQuestionValueChanged = '@mnl/application/QUESTION_VALUE_CHANGED';
export const APPLICATION_QUESTION_VALUE_CHANGED: ApplicationQuestionValueChanged = '@mnl/application/QUESTION_VALUE_CHANGED';
export type ApplicationQuestionValueChangedAction = {
  type: ApplicationQuestionValueChanged;
  qid: number;
  newValue: string;
};

export type SaveApplication = '@mnl/application/SAVE';
export const SAVE_APPLICATION: SaveApplication = '@mnl/application/SAVE';
export type SaveApplicationAction = {
  type: SaveApplication;
  template: ApplicationTemplate;
};

// TODO: figure how save app works
export type SaveApplicationSuccess = '@mnl/application/SAVE_SUCCESS';
export const SAVE_APPLICATION_SUCCESS: SaveApplicationSuccess = '@mnl/application/SAVE_SUCCESS';
export type SaveApplicationSuccessAction = {
  type: SaveApplicationSuccess;
  template: ApplicationTemplate;
};

export type SubmitApplication = '@mnl/application/SUBMIT';
export const SUBMIT_APPLICATION: SubmitApplication = '@mnl/application/SUBMIT';
export type SubmitApplicationAction = {
  type: SubmitApplication;
  template: ApplicationTemplate;
};

export type DeleteApplication = '@mnl/application/DELETE';
export const DELETE_APPLICATION: DeleteApplication = '@mnl/application/DELETE';
export type DeleteApplicationAction = {
  type: DeleteApplication;
  payload: {
    appId: number;
  };
};

export type DeleteApplicationSuccess = '@mnl/application/DELTE_SUCCESS';
export const DELETE_APPLICATION_SUCCESS: DeleteApplicationSuccess = '@mnl/application/DELTE_SUCCESS';
export type DeleteApplicationSuccessAction = {
  type: DeleteApplicationSuccess;
  payload: {
    appId: number;
  };
};

export type GetApplicationList = '@mnl/application/GET_LIST';
export const GET_APPLICATION_LIST: GetApplicationList = '@mnl/application/GET_LIST';
export type GetApplicationListAction = {
  type: GetApplicationList;
};

export type GetApplicationListSuccess = '@mnl/application/GET_APPLICATION_LIST_SUCCESS';
export const GET_APPLICATION_LIST_SUCCESS: GetApplicationListSuccess = '@mnl/application/GET_APPLICATION_LIST_SUCCESS';
export type GetApplicationListSuccessAction = {
  type: GetApplicationListSuccess;
  payload: {
    applications: ApplicationTemplate[]
  };
};

export type ReplyToApplication = '@mnl/application/REPLY';
export const REPLY_TO_APPLICATION: ReplyToApplication = '@mnl/application/REPLY';
export type ReplyToApplicationAction = {
  type: ReplyToApplication;
  payload: {
    reply: ApplicationReply;
  };
};

export type ReplyToApplicationSuccess = '@mnl/application/REPLY_SUCCESS';
export const REPLY_TO_APPLICATION_SUCCESS: ReplyToApplicationSuccess = '@mnl/application/REPLY_SUCCESS';
export type ReplyToApplicationSuccessAction = {
  type: ReplyToApplicationSuccess;
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
  | InitializeReduxFormAction
  | SubmitApplicationAction
  | DeleteApplicationAction
  | DeleteApplicationSuccessAction
  | GetApplicationListAction
  | GetApplicationListSuccessAction
  | ReduxFormAction
  | ReplyToApplicationAction
  | ReplyToApplicationSuccessAction
  | Action;


// Redux Form

export type InitializeReduxForm = 'redux-form/INITIALIZE';
export const INITIALIZE_REDUX_FORM: InitializeReduxForm = 'redux-form/INITIALIZE';
export type InitializeReduxFormAction = {
  type: InitializeReduxForm;
  meta: any;
  payload: any;
};

export type StartSubmitReduxForm = 'redux-form/START_SUBMIT';
export const START_SUBMIT_REDUX_FORM: StartSubmitReduxForm = 'redux-form/START_SUBMIT';
export type StartSubmitReduxFormAction = {
  type: StartSubmitReduxForm;
  meta: {
    form: string;
  };
};

export type EndSubmitReduxForm = 'redux-form/END_SUBMIT';
export const END_SUBMIT_REDUX_FORM: EndSubmitReduxForm = 'redux-form/END_SUBMIT';
export type EndSubmitReduxFormAction = {
  type: EndSubmitReduxForm;
  meta: {
    form: string;
  };
};

export type SetSubmitSucceededReduxForm = 'redux-form/SET_SUBMIT_SUCCEDED';
export const SET_SUBMIT_SUCCEDED_REDUX_FORM: SetSubmitSucceededReduxForm = 'redux-form/SET_SUBMIT_SUCCEDED';
export type SetSubmitSucceededReduxFormAction = {
  type: SetSubmitSucceededReduxForm;
  meta: {
    form: string;
    fields?: any[];
  };
  error: boolean;
};

export type ReduxFormAction = InitializeReduxFormAction
  | StartSubmitReduxFormAction
  | EndSubmitReduxFormAction
  | SetSubmitSucceededReduxFormAction
  | Action;


export type AnyAction = ApplicationAction
| BlogAction
| AdminAction;