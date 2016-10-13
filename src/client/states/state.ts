import {AdminState} from './admin/admin';
import {WoWState} from './wow';
import {AjaxifyState} from './ajaxify';
import {AppState} from './app';
import { IRouterState } from 'react-router-redux';

export interface State {
  ajaxify: AjaxifyState;
  app: AppState;
  routing: IRouterState;
  wow: WoWState;
  admin: AdminState;
}
