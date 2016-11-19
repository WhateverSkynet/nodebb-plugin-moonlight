import * as actions from "../../actions";
import { store } from "../index";

//TODO: Clean up and improove perf
export const getWoWData = (cb: () => void) => {
  const wow = store.getState().wow;
  if (wow.classes && wow.classes.length) {
    cb();
  } else {
    window.ajaxify.loadData("mnl/wow", (err, data) => {
      if (err) {
        //TODO: Handle error
        return;
      }

      store.dispatch(data.action);
      cb();
    });
  }
};