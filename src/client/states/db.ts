import { ApplicationTemplate } from '../../models/application';

export interface ApplicationDbState {
  byId: {[appId: number]: ApplicationTemplate};
  allIds: number[];
}

export interface DbState {
  applications: ApplicationDbState;
}