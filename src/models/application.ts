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
  isMain?: boolean;
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

export interface ApplicationValidationErrors {
  questions?: number[];
  characters?: PropertyValidationErrors;
}

type Error = "ERROR";
export const ERROR: Error = "ERROR";
type Warning = "WARNING";
export const WARNING: Warning = "WARNING";
type Info = "INFO";
export const INFO: Info = "INFO";

export type PropertyValidationErrors = {
  [guid: string]: {
    [proeprtyName: string]: ValidationError
  }
};

export type ErrorType = Error | Warning | Info;

export class ValidationError {
  constructor(public type: ErrorType, public message: string) {

  }
}