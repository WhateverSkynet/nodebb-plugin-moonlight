
import reducer from './discord';
import { Action, ADMIN_SET_DISCORD_SETTINGS, AdminSetDiscordSettingsAction } from '../../../actions';

describe('discord reducer', () => {

  it('should initialize default state', () => {

    const state = reducer(undefined, Action);

    expect(state).toMatchObject({
      webhooks: [],
    });

  });

  it('should add new webhook', () => {
    const webhook = {
      id: 'abcd',
      token: 'xyz',
      events: {
        applicationSubmitted: true,
        newReplyFromApplicant: true,
      },
    };

    const action: AdminSetDiscordSettingsAction = {
      type: ADMIN_SET_DISCORD_SETTINGS,
      settings: {
        siteUrl: '',
        webhooks: [
          webhook,
        ],
      },
    };

    const state = reducer(undefined, action);

    console.log(state.webhooks)
    expect(state).toHaveProperty('webhooks');
    expect(state.webhooks).toHaveLength(1);
    expect(state.webhooks[0]).toMatchObject(webhook);

  });

    it('should add two new webhook', () => {
    const webhook1 = {
      id: 'abcd',
      token: 'xyz',
      events: {
        applicationSubmitted: true,
        newReplyFromApplicant: false,
      },
    };

    const webhook2 = {
      id: 'abcdf',
      token: 'xyzpq',
      events: {
        applicationSubmitted: false,
        newReplyFromApplicant: true,
      },
    };

    const action: AdminSetDiscordSettingsAction = {
      type: ADMIN_SET_DISCORD_SETTINGS,
      settings: {
        siteUrl: '',
        webhooks: [
          webhook1,
          webhook2,
        ],
      },
    };

    const state = reducer({
      siteUrl: '',
      webhooks: [webhook1],
    }, action);

    console.log(state.webhooks)
    expect(state).toHaveProperty('webhooks');
    expect(state.webhooks).toHaveLength(2);
    expect(state.webhooks[0]).toMatchObject(webhook1);
    expect(state.webhooks[1]).toMatchObject(webhook2);

  });

});
