import { ADMIN_SET_BLIZZARD_SETTINGS, ADMIN_SET_DISCORD_SETTINGS } from '../../actions';
import { store } from '../index';

//TODO: Clean up
export const getSettings = () => {
  window.socket.emit('admin.settings.get', {
    hash: 'moonlight',
  }, function (err, values) {
    if (err) {
      return;
    }
    const settings = {
      key: values.key,
      region: values.region,
      guild: values.guild,
      realm: values.realm,
    };
    store.dispatch({
      type: ADMIN_SET_BLIZZARD_SETTINGS,
      settings,
    });

    if (values.discord) {
      store.dispatch({
        type: ADMIN_SET_DISCORD_SETTINGS,
        settings: JSON.parse(values.discord),
      });
    }

  });
};
