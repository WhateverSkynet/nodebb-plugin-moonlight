import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';
import {RosterState} from './roster';
import { ApplicationState } from './application';

export interface AppData {
  realms?: string[];
  classes?: CharacterClass[];
  questions?: Question[];
}

export interface AppState {
  data: AppData;
  roster?: RosterState;
  application?: ApplicationState;
}