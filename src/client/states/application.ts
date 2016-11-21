import { Question } from '../../models/application';
import { ApplicationTemplate } from './../../models/application';

export interface ApplicationState {
  questions?: Question[];
  templateQuestions?: number[];
  editQuestionIndex?: number;
  template?: ApplicationTemplate;
  actions?: string[];
}
