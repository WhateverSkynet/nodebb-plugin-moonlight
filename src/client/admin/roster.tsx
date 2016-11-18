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
  <div className="panel">
    <h2 className="panel__header">Roster</h2>
    <button className="panel__button panel__button--action" onClick={() => triggerRosterUpdate()}>Update from Armory</button>
  </div >
);