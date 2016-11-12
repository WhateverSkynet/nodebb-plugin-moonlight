import { Question } from '../../models/application';
import { RosterCharacter } from '../../models/wow';
import { Recruitment } from '../../models/recruitment';
export interface AjaxifyState {
  questions?: Question[];
  roster?: RosterCharacter[];

  recruitment?: Recruitment.RecruitmentItem[];

}
