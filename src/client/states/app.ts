import {CharacterClass} from '../../models/wow';
import {Question} from '../../models/application';
import {RosterState} from './roster';
import { ApplicationState } from './application';
import { ApplicationListState } from './application-list.state';

export interface AppData {
  realms?: string[];
  classes?: CharacterClass[];
  questions?: Question[];
}

export interface AppState {
  data: AppData;
  roster?: RosterState;
  application?: ApplicationState;
  applicationList?: ApplicationListState;
}