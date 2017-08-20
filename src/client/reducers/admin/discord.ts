
import { combineReducers } from 'redux';

import { AdminAction, Action, ADMIN_SET_DISCORD_SETTINGS } from '../../../actions';
import { DiscordWebhook } from '../../../models/discord';
import { DiscordSettingsState } from '../../states/admin/discord-settings';

const webhooks = (state: DiscordWebhook[] = [], action: AdminAction = Action) => {
  switch (action.type) {
    case ADMIN_SET_DISCORD_SETTINGS:
      return JSON.parse(JSON.stringify(action.settings.webhooks)) || [];
    default:
      return state;
  }
};

const siteUrl = (state = '', action: AdminAction = Action) => {
  switch (action.type) {
    case ADMIN_SET_DISCORD_SETTINGS:
      return action.settings.siteUrl || '';
    default:
      return state;
  }
};

export default combineReducers<DiscordSettingsState>({
  webhooks,
  siteUrl,
});
