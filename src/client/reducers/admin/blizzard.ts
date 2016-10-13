import { ADMIN_SET_BLIZZARD_SETTINGS, AdminAction, Action } from '../../../actions';
import { BlizzardSettingsState } from '../../states/admin/blizzard-settings';


export const blizzardReducer = (state: BlizzardSettingsState = {}, action: AdminAction = Action) => {
  switch (action.type) {
    case ADMIN_SET_BLIZZARD_SETTINGS:
      return {
        key: action.settings.key,
        region: action.settings.region,
        guild: action.settings.guild,
        realm: action.settings.realm
      };
    default:
      return state;
  }
};
