import { CharacterClass } from './wow';

export interface Question {
    qid?: number;
    text?: string;
    changed?: number;
    value?: string;
    active?: string;
    deleted?: string;
}

export interface Application {
    realms: string[];
    characterClasses: CharacterClass[];
    questions: Question[];
    characters: ApplicationCharacter[];
}

export interface ApplicationTemplate {
    appId?: number;
    status?: number;
    uid?: number;
    changed?: number;
    deleted?: number;
    questions?: Question[];
    characters?: ApplicationCharacter[];
}

export interface ApplicationCharacter {
    guid?: string;
    name?: string;
    realm?: string;
    class?: string;
    userInterfaceUrl?: string;
    primarySpecialization?: string;
    secondarySpecialization?: string;
}

export interface ApplicationCharacterChange {
    name?: string;
    realm?: string;
    class?: string;
    userInterfaceUrl?: string;
    primarySpecialization?: string;
    secondarySpecialization?: string;
}