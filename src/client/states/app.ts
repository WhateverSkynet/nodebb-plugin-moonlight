import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';
import {RosterState} from './roster';
import * as Recruitment from "../components/recruitment/class-panel";
import { ApplicationState } from './application';

export interface AppData {
  realms?: string[];
  classes?: CharacterClass[];
}

export interface AppState {
  data: AppData;
  roster?: RosterState;
  application?: ApplicationState;
}