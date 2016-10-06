import * as BattleNet from "./battlenet/index";
import * as Recruitment from "./components/recruitment/class-panel";

export interface Action {
  type: string;
  value?: any;
}

export interface Question {
    id: number;
    text: string;
    value?: string;
}

export interface AppData {
  realms?: string[],
  classes?: BattleNet.CharacterClass[],
  questions?: Question[],
  recruitment?: Recruitment.ClassPanelProps[]
}

export interface AppState {
  data: AppData
  filters: any
}