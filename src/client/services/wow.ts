import * as actions from "../../actions";
import { store } from "../index";

//TODO: Clean up and improove perf
export const getWoWData = (cb: () => void) => {
  // if (store.getState().wow) {
  //   cb();
  // } else {
    window.ajaxify.loadData("mnl/wow", (err, data) => {
      if (err) {
        //TODO: Handle error
        return;
      }

      store.dispatch(data.action);
      cb();
    });
  //}
};