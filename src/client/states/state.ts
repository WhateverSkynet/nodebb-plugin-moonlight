import { AdminState } from './admin/admin';
import { WoWState } from './wow';
import { AjaxifyState } from './ajaxify';
import { AppState } from './app';

export interface State {
  ajaxify: AjaxifyState;
  app: AppState;
  routing: any;
  wow: WoWState;
  admin: AdminState;
}
