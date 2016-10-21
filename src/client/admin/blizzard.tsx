import { BlizzardSettingsState } from '../states/admin/blizzard-settings';
import { State } from '../states/state';
import { RosterCharacter } from '../../models/wow';
import { AdminSetBlizzardSettingsAction, ADMIN_SET_BLIZZARD_SETTINGS } from '../../actions';
import * as React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { store } from "../index";

interface BlizzardSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  apiKey: string;
  region: string;
  guild: string;
  realm: string;
}

const regions = ["us", "eu", "kr", "tw", "cn"];

const saveSettings = () => {
  window.socket.emit('admin.settings.set', {
    hash: "moonlight",
    values: store.getState().admin.blizzard
  }, function (err) {

    window.app.alert({
      title: 'Settings Saved',
      type: 'success',
      timeout: 2500
    });

  });
};

const handleInput = (key: string, value: string) => {
  let props = store.getState().admin.blizzard;
  if (props[key] === value) {
    return;
  }
  props[key] = value;
  let action = {
    type: ADMIN_SET_BLIZZARD_SETTINGS,
    settings: props
  };
  store.dispatch(action);
};

const BlizzardSettingsImpl: React.StatelessComponent<BlizzardSettingsProps> = (props: BlizzardSettingsProps) => (
  <div className="mui-panel">
    <div className="mui--text-display1 mui--text-light-secondary">
      Blizzard Api Settings
      </div>
    <div className="mui-textfield mui-textfield--float-label">
      <input
        type="text"
        defaultValue={props.apiKey}
        onBlur={(e) =>  handleInput("apiKey", e.target.value)}
        />
      <label>Api key</label>
    </div>
    <div className="mui-dropdown">
      <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
        {props.region ? props.region : "Region"}
        <span className="mui-caret"></span>
      </button>
      <ul className="mui-dropdown__menu">
        {
          regions.map(x => (
            <li key={x}><a onClick={() => handleInput("region", x)}>{x.toUpperCase()}</a></li>
          ))
        }

      </ul>
    </div>
    <div className="mui-textfield mui-textfield--float-label">
      <input
        type="text"
        defaultValue={props.guild}
        onBlur={(e) =>  handleInput("guild", e.target.value)}
        />
      <label>Guild</label>
    </div>
    <div className="mui-textfield mui-textfield--float-label">
      <input
        type="text"
        defaultValue={props.realm}
        onBlur={(e) =>  handleInput("realm", e.target.value)}
        />
      <label>Realm</label>
    </div>
    <button className="mui-btn  mui-btn--primary" onClick={() => saveSettings()}>Save</button>
  </div>

);
const mapStateToProps = (state: State) => {
  return {
    apiKey: state.admin.blizzard.key,
    region: state.admin.blizzard.region,
    guild: state.admin.blizzard.guild,
    realm: state.admin.blizzard.realm
  };
};


export const BlizzardSettings = connect(mapStateToProps)(BlizzardSettingsImpl);
