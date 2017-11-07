'use strict'

const async = require('async')
const request = require('request')

const db = require.main.require('./src/database')
const meta = require.main.require('./src/meta')
const user = require.main.require('./src/user')

const SETTINGS_KEY = 'moonlight'

const triggerDiscordWebhook = (event, payload, settings, next) => {
  if (!settings.webhooks.length) {
    next()
  }

  const tasks = settings.webhooks
    .filter(({ events }) => events[event])
    .map(({ id, token }) => next => request({
      method: 'POST',
      url: `https://discordapp.com/api/webhooks/${id}/${token}`,
      json: payload
    }, next))

  async.parallel(tasks, next)
}

const triggerApplicationSubmitted = (uid, appId, next) => {
  async.parallel([
    next => user.getUserFields(uid, ['uid', 'username', 'picture'], next),
    next => db.getObjectFields('mnl:application:' + appId, ['status', 'characters'], next),
    next => meta.settings.get(SETTINGS_KEY, next)
  ], (err, [{ username, picture }, app, { discord: json = '{}' }]) => {
    if (err) {
      return next(err)
    }
    const discord = JSON.parse(json)
    const [character] = JSON.parse(app.characters)
    const { realm, name: characterName } = character
    triggerDiscordWebhook('applicationSubmitted', {
      content: `New application by ${username}`,
      embeds: [{
        title: `[${character.class}] ${characterName}-${realm}`,
        type: 'rich',
        url: `${discord.siteUrl}/application/${appId}`,
        author: {
          name: username,
          url: `${discord.siteUrl}/user/${username}`,
          icon_url: picture ? `${discord.siteUrl}/${picture}` : undefined
        }
      }]
    }, discord, next)
  })
}

const triggerNewReplyFromApplicant = (uid, appId, message, next) => {
  async.parallel([
    next => user.getUserFields(uid, ['uid', 'username', 'picture'], next),
    next => db.getObjectFields('mnl:application:' + appId, ['status', 'characters'], next),
    next => meta.settings.get(SETTINGS_KEY, next)
  ], (err, [{ username, picture }, app, { discord: json = '{}' }]) => {
    if (err) {
      return next(err)
    }
    const discord = JSON.parse(json)
    const [character] = JSON.parse(app.characters)
    const { realm, name: characterName } = character
    triggerDiscordWebhook('newReplyFromApplicant', {
      content: `New reply to application by ${username}`,
      embeds: [{
        title: `[${character.class}] ${characterName}-${realm}`,
        type: 'rich',
        url: `${discord.siteUrl}/application/${appId}`,
        description: message,
        author: {
          name: username,
          url: `${discord.siteUrl}/user/${username}`,
          icon_url: picture ? `${discord.siteUrl}/${picture}` : undefined
        }
      }]
    }, discord, next)
  })
}

module.exports = {
  triggerApplicationSubmitted,
  triggerNewReplyFromApplicant
}
