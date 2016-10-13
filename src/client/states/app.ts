import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';
import {RosterState} from './roster';
import * as Recruitment from "../components/recruitment/class-panel";

export interface AppData {
  realms?: string[];
  classes?: CharacterClass[];
  questions?: Question[];
  //recruitment?: Recruitment.ClassPanelProps[];
}

export interface AppState {
  data: AppData;
  roster?: RosterState;
}