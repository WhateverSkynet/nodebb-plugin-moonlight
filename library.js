"use strict";

var controllers = require('./lib/controllers'),
  Sockets = require('./lib/sockets/index'),
  SocketPlugins = require.main.require('./src/socket.io/plugins'),
  plugin = {};

plugin.init = function (params, callback) {
  var router = params.router,
    hostMiddleware = params.middleware,
    hostControllers = params.controllers;

  // We create two routes for every view. One API call, and the actual route itself.
  // Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

  var middlewares = [hostMiddleware.registrationComplete, hostMiddleware.pageView, hostMiddleware.pluginHooks];

 // router.get(name, middleware.busyCheck, middleware.buildHeader, middlewares, controller);


  router.get('/admin/plugins/moonlight', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
  router.get('/api/admin/plugins/moonlight', middlewares, controllers.renderAdminPage);

  router.get('/applications', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplicationsPage);
  router.get('/api/applications', middlewares, controllers.renderApplicationsPage);

  router.get('/apply', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplyPage);
  router.get('/api/apply', middlewares, controllers.renderApplyPage);

  router.get('/landing', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderLandingPage);
  router.get('/api/landing', middlewares, controllers.renderLandingPage);

  router.get('/roster', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderRosterPage);
  router.get('/api/roster', middlewares, controllers.renderRosterPage);

  router.get('/application/:id', hostMiddleware.busyCheck, hostMiddleware.buildHeader, middlewares, controllers.renderApplicationPage);
  router.get('/api/application/:id', middlewares, controllers.renderApplicationPage);

  router.get('/api/mnl/wow', [] , controllers.renderWoWData);

  SocketPlugins.ml = Sockets;

  callback();
};

plugin.addAdminNavigation = function (header, callback) {
  header.plugins.push({
    route: '/plugins/moonlight',
    icon: 'fa-tint',
    name: 'Moonlight'
  });

  callback(null, header);
};


module.exports = plugin;