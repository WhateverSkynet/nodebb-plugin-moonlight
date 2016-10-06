'use strict';
/* globals $, app, socket */

define('admin/plugins/moonlight', ['settings'], function (Settings) {

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
          clickfn: () => {
            socket.emit('admin.reload');
          },
        });
      });
    });

    $('#update').on('click', function () {
      socket.emit('plugins.ml.roster.update', {}, function(err) {
         app.alert({
          type: 'success',
          alert_id: 'moonlight-saved',
          title: 'Roster updated',
          message: !err ? "Roster update successful!" : err.message  
        });
      });
    });
  };

  return ACP;
});