
import { State } from '../states/state';
import { ADMIN_SET_BLIZZARD_SETTINGS } from '../../actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface BlizzardSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  apiKey: string;
  region: string;
  guild: string;
  realm: string;
}

const regions = ['us', 'eu', 'kr', 'tw', 'cn'];

const saveSettings = () => {
  window.socket.emit('admin.settings.set', {
    hash: 'moonlight',
    values: store.getState().admin.blizzard,
  }, function (err) {

    window.app.alert({
      title: 'Settings Saved',
      type: 'success',
      timeout: 2500,
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
    settings: props,
  };
  store.dispatch(action);
};

const renderTextField = (label: string, defaultValue: string, key: string) => {
  return (
    <div>
      <TextField
        floatingLabelFixed={true}
        fullWidth={true}
        floatingLabelStyle={{
          color: '#007ABE',
          fontWeight: 400,
        }}
        inputStyle={{
          // This is needed to override nodebb box css.
          boxShadow: 'none',
        }}
        floatingLabelText={label}
        defaultValue={defaultValue}
        onBlur={(e) => handleInput(key, e.target.value)} />
    </div>
  );
};

const BlizzardSettingsImpl: React.StatelessComponent<BlizzardSettingsProps> = (props: BlizzardSettingsProps) => (
  <div className='panel'>
    <h2 className='panel__header'>
      Blizzard Api Settings
      </h2>
    <div className='panel__content'>
      {
        renderTextField('Api Key', props.apiKey, 'key')
      }
      <SelectField
        value={props.region}
        floatingLabelStyle={{
          color: '#007ABE',
          fontWeight: 400,
        }}
        onChange={(e, key, payload) => handleInput('region', payload)}
        floatingLabelText='Region'
        fullWidth={true}
        >
        {
          regions.map((x, i) => <MenuItem key={x} value={x} primaryText={x.toUpperCase()} />)
        }
      </SelectField>
      {
        renderTextField('Guild', props.guild, 'guild')
      }
      {
        renderTextField('Realm', props.realm, 'realm')
      }
    </div>
    <button className='panel__button panel__button--action' onClick={() => saveSettings()}>Save</button>
  </div >

);
const mapStateToProps = (state: State) => {
  return {
    apiKey: state.admin.blizzard.key,
    region: state.admin.blizzard.region,
    guild: state.admin.blizzard.guild,
    realm: state.admin.blizzard.realm,
  };
};


export const BlizzardSettings = connect(mapStateToProps)(BlizzardSettingsImpl);

    // <div className="mui-dropdown">
    //   <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
    //     {props.region ? props.region : "Region"}
    //     <span className="mui-caret"></span>
    //   </button>
    //   <ul className="mui-dropdown__menu">
    //     {
    //       regions.map(x => (
    //         <li key={x}><a onClick={() => handleInput("region", x)}>{x.toUpperCase()}</a></li>
    //       ))
    //     }

    //   </ul>
    // </div>