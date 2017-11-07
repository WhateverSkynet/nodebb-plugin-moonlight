'use strict'

const controllers = require('./lib/controllers')
const Sockets = require('./lib/sockets/index')
const SocketPlugins = require.main.require('./src/socket.io/plugins')
const plugin = {}
const async = require('async')
const groups = require.main.require('./src/groups')

plugin.init = function (params, callback) {
  const router = params.router
  const hostMiddleware = params.middleware

  // We create two routes for every view. One API call, and the actual route itself.
  // Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

  const publicMiddlewares = [hostMiddleware.registrationComplete, hostMiddleware.pageView, hostMiddleware.pluginHooks]
  const middlewares = [hostMiddleware.authenticate, ...publicMiddlewares]

  // router.get(name, middleware.busyCheck, middleware.buildHeader, middlewares, controller);

  router.get('/admin/plugins/moonlight', hostMiddleware.admin.buildHeader, controllers.renderAdminPage)
  router.get('/api/admin/plugins/moonlight', middlewares, controllers.renderAdminPage)

  router.get('/applications', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplicationsPage)
  router.get('/api/applications', middlewares, controllers.renderApplicationsPage)

  router.get('/apply', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplyPage)
  router.get('/api/apply', middlewares, controllers.renderApplyPage)

  router.get('/landing', hostMiddleware.busyCheck, hostMiddleware.buildHeader, publicMiddlewares, controllers.renderLandingPage)
  router.get('/api/landing', publicMiddlewares, controllers.renderLandingPage)

  router.get('/roster', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderRosterPage)
  router.get('/api/roster', middlewares, controllers.renderRosterPage)

  router.get('/application/:id', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplicationPage)
  router.get('/api/application/:id', middlewares, controllers.renderApplicationPage)

  router.get('/api/mnl/wow', [], controllers.renderWoWData)

  SocketPlugins.ml = Sockets

  callback()
}

const isOfficer = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'officers', callback)
  } else {
    groups.isMember(uid, 'officers', callback)
  }
}

const isRaider = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'raiders', callback)
  } else {
    groups.isMember(uid, 'raiders', callback)
  }
}

const isTrial = (uid, callback) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'trials', callback)
  } else {
    groups.isMember(uid, 'trials', callback)
  }
}

plugin.renderHeader = (data, callback) => {
  const uid = data.req.uid
  async.series({
    isOfficer: (next) => {
      isOfficer(uid, next)
    },
    isRaider: (next) => {
      isRaider(uid, next)
    },
    isTrial: (next) => {
      isTrial(uid, next)
    }
  }, (err, membership) => {
    if (err) {
      return callback(err)
    }
    const user = data.templateValues.user
    user.isOfficer = membership.isOfficer
    user.isRaider = membership.isRaider
    user.isTrial = membership.isTrial
    user.isMember = membership.isRaider || membership.isOfficer
    data.templateValues.userJSON = JSON.stringify(user)
    callback(null, data)
  })
}
plugin.addAdminNavigation = function (header, callback) {
  header.plugins.push({
    route: '/plugins/moonlight',
    icon: 'fa-tint',
    name: 'Moonlight'
  })

  callback(null, header)
}

module.exports = plugin
