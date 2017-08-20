
import { State } from '../states/state';
import { ADMIN_SET_BLIZZARD_SETTINGS, ADMIN_SET_DISCORD_SETTINGS, AdminSetDiscordSettingsAction } from '../../actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { DiscordWebhook } from '../../models/discord';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { DiscordSettingsState } from '../states/admin/discord-settings';

interface DiscordSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  webhooks?: DiscordWebhook[];
  siteUrl?: string;
  actions?: {
    setSettings?: (settings: DiscordSettingsState) => AdminSetDiscordSettingsAction;
  }
}


const saveSettings = () => {
  window.socket.emit('admin.settings.set', {
    hash: 'moonlight',
    values: {
      discord: JSON.stringify(store.getState().admin.discord),
    },
  }, function (err) {

    window.app.alert({
      title: 'Settings Saved',
      type: 'success',
      timeout: 2500,
    });

  });
};

const handleInput = (index: number, key: string, value: string) => {
  let props = store.getState().admin.discord;
  let webhook = props.webhooks[index];
  if (webhook[key] === value) {
    return;
  }
  webhook[key] = value;
  let action = {
    type: ADMIN_SET_DISCORD_SETTINGS,
    settings: props,
  };
  store.dispatch(action);
};
const handleUrlInput = (value: string) => {
  let props = store.getState().admin.discord;

  props.siteUrl = value;
  let action = {
    type: ADMIN_SET_DISCORD_SETTINGS,
    settings: props,
  };
  store.dispatch(action);
};

const renderTextField = (index: number, label: string, defaultValue: string, key: string) => {
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
        onBlur={(e) => handleInput(index, key, e.target.value)} />
    </div>
  );
};

const renderUrlTextField = (defaultValue: string) => {
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
        floatingLabelText='Site URL'
        defaultValue={defaultValue}
        onBlur={(e) => handleUrlInput(e.target.value)} />
    </div>
  );
};

const buttonStyle = {
  margin: 12,
};

const DiscordSettingsImpl: React.StatelessComponent<DiscordSettingsProps> = (props: DiscordSettingsProps) => (
  <div className='panel'>
    <h2 className='panel__header'>
      Discord Settings
      </h2>
    <div className='panel__content'>
        {renderUrlTextField(props.siteUrl)}
      <h3>Webhooks</h3>
      <RaisedButton
        primary={true}
        label='Add Webhook'
        onClick={() => props.actions.setSettings({
          siteUrl: props.siteUrl,
          webhooks: [...props.webhooks, {
            id: '',
            token: '',
            events: {
              applicationSubmitted: true,
              newReplyFromApplicant: true,
            },
          }],
        })}
        style={buttonStyle} />
      {
        props.webhooks.map(({ id, token, events }, i) => (
          <div key={id}>
            {renderTextField(i, 'Id', id, 'id')}
            {renderTextField(i, 'Token', token, 'token')}
          </div>))
      }
    </div>
    <button className='panel__button panel__button--action' onClick={() => saveSettings()}>Save</button>
  </div >

);
const mapStateToProps = (state: State) => {
  const { webhooks, siteUrl } = state.admin.discord;
  const props: DiscordSettingsProps = {
    siteUrl,
    webhooks,
  };
  return props;
};

const mapDispatchToProps = (dispatch: any) => {
  const props: DiscordSettingsProps = {
    actions: bindActionCreators({
      setSettings: (settings: DiscordSettingsState) => ({
        type: ADMIN_SET_DISCORD_SETTINGS,
        settings,
      }),
    }, dispatch),
  };
  return props;
};


export const DiscordSettings = connect(mapStateToProps, mapDispatchToProps)(DiscordSettingsImpl);
