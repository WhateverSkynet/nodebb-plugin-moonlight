import * as React from "react";

const triggerRosterUpdate = () => {
  window.socket.emit('plugins.ml.roster.update', {}, (err) => {
    window.app.alert({
      type: 'success',
      alert_id: 'moonlight-saved',
      title: 'Roster updated',
      message: !err ? "Roster update successful!" : err.message
    });
  });
};

export const RosterSettings = (props) => (
  <div className="mui-panel">

    <button className="mui-btn mui-btn-primary" onClick={() => triggerRosterUpdate()}>
      Update Roster
    </button>
  </div>
);