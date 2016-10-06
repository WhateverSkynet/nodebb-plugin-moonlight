import * as BattleNet from "../BattleNet/index";

export interface Question {
    id: number;
    text: string;
    value?: string;
}

export interface Application {
     realms: string[];
    characterClasses: BattleNet.CharacterClass[];
    questions: Question[];
    characters: BattleNet.Character[];
}