import { ADMIN_SET_BLIZZARD_SETTINGS }  from "../../actions";
import { store } from "../index";

//TODO: Clean up 
export const getSettings = () => {
  window.socket.emit('admin.settings.get', {
    hash: "moonlight"
  }, function (err, values) {
    if (err) {
      return;
    }
    const settings = {
        key: values.key,
        region: values.region,
        guild: values.guild,
        realm: values.realm
    };
    store.dispatch({
      type: ADMIN_SET_BLIZZARD_SETTINGS,
      settings
    });
  });
};
