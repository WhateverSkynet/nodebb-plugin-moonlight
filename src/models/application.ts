import { CharacterClass } from './wow';

export interface Question {
  qid?: number;
  text?: string;
  changed?: number;
  value?: string;
  active?: boolean;
  deleted?: number;
}

export interface ApplicationReply {
  id?: number;
  uid?: number;
  author?: string;
  appId?: number;
  message?: string;
  timestamp?: number;
  isApplicant?: boolean;
}

export interface ApplicationTemplate {
  appId?: number;
  status?: number;
  uid?: number;
  author?: string;
  submitted?: number;
  changed?: number;
  deleted?: number;
  questions?: Question[];
  characters?: ApplicationCharacter[];
  replies?: ApplicationReply[];
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
