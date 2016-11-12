import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';
import {RosterState} from './roster';

export interface AppData {
  realms?: string[];
  classes?: CharacterClass[];
  questions?: Question[];
}

export interface AppState {
  data: AppData;
  roster?: RosterState;
}