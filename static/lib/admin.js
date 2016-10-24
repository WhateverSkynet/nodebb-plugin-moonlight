'use strict';
/* globals $, app, socket */

(function () {
	/*
		This file shows how client-side javascript can be included via a plugin.
		If you check `plugin.json`, you"ll see that this file is listed under "scripts".
		That array tells NodeBB which files to bundle into the minified javascript
		that is served to the end user.

		Some events you can elect to listen for:

		$(document).ready();			Fired when the DOM is ready
		$(window).on("action:ajaxify.end", function(data) { ... });			"data" contains "url"
	*/

  //TODO: remove dependency on mui.js
  var script = document.createElement("script");
  script.setAttribute("src", "/src/modules/muicss.js");
  document.head.appendChild(script);
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "/src/modules/moonlight/style.css");
  document.head.appendChild(link);
  document.head.appendChild(script);
  
  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["moonlight/bundle"], function (App) {

      if (ajaxify.data.url.startsWith("/admin/plugins/moonlight")) {

        if (ajaxify.data.action) {
          App.store.dispatch(ajaxify.data.action);
        }
        App.navigate(ajaxify.data.url);
      }

    });
  });
}());

define('admin/plugins/moonlight', ['settings', "react", "reactDOM", "moonlight/bundle"], function (Settings, React, ReactDOM, Moonlight) {

  var ACP = {};


  // var events = {
  //   'ticket:user_status_change': onUserStatusChange,
  // };

  // Events.init = function () {
  //   Events.removeListeners();
  //   for (var eventName in events) {
  //     if (events.hasOwnProperty(eventName)) {
  //       socket.on(eventName, events[eventName]);
  //     }
  //   }
  // };

  // Events.removeListeners = function () {
  //   for (var eventName in events) {
  //     if (events.hasOwnProperty(eventName)) {
  //       socket.removeListener(eventName, events[eventName]);
  //     }
  //   }
  // };


  ACP.init = function () {
    Settings.load('moonlight', $('.moonlight-settings'));

    $('#save').on('click', function () {
      Settings.save('moonlight', $('.moonlight-settings'), function () {
        app.alert({
          type: 'success',
          alert_id: 'moonlight-saved',
          title: 'Settings Saved',
          message: 'Success',
          clickfn: function () {
            socket.emit('admin.reload');
          },
        });
      });
    });

    ReactDOM.render(
      React.createElement(Moonlight.AdminPage, {}),
      document.getElementById("moonlight-content")
    );
  };

  return ACP;
});