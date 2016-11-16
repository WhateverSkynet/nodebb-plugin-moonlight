import { Question, ApplicationValidationErrors } from '../../models/application';
import { ApplicationTemplate } from './../../models/application';

export interface ApplicationState {
  questions?: Question[];
  templateQuestions?: number[];
  editQuestionIndex?: number;
  template?: ApplicationTemplate;
  validationErrors: ApplicationValidationErrors;
  actions?: string[];
}

// export type Reply = "REPLY";
// export const REPLY : Reply = "REPLY";
