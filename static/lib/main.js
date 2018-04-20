"use strict";
/* global ajaxify, app, $ */
(function() {
  /*
    This file shows how client-side javascript can be included via a plugin.
    If you check `plugin.json`, you"ll see that this file is listed under "scripts".
    That array tells NodeBB which files to bundle into the minified javascript
    that is served to the end user.
    Some events you can elect to listen for:
    $(document).ready(); Fired when the DOM is ready
    $(window).on("action:ajaxify.end", function(data) { ... }); "data" contains "url"
  */
  var validUrls = ["/landing", "/roster", "/apply", "/applications"];
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "/plugins/nodebb-plugin-moonlight/public/moonlight.css"
  );
  document.head.appendChild(link);
  var root = document.createElement("div");
  root.setAttribute("id", "moonlight-root");
  require(["/plugins/nodebb-plugin-moonlight/public/main.js"], function(App) {
    App.initSocket();
  });
  var matchRooms = function(path) {
    switch (path) {
      case "/landing":
        return "mnl_landing";
      case "/roster":
        return "mnl_roster";
      case "/apply":
        return "mnl_apply";
      case "/applications":
        return "mnl_applications";
      case "/application":
        return "mnl_application";
      default:
        return "mnl";
    }
  };

  $(window).on("action:ajaxify.contentLoaded", function(data) {
    require(["/plugins/nodebb-plugin-moonlight/public/main.js"], function(App) {
      if (
        validUrls.indexOf(ajaxify.data.url) !== -1 ||
        ajaxify.data.url.startsWith("/application")
      ) {
        App.render(root, ajaxify.data.url);
        document.getElementById("moonlight-content").appendChild(root);
        if (ajaxify.data.action) {
          App.store.dispatch(ajaxify.data.action);
        } else if (ajaxify.data.actions) {
          ajaxify.data.actions.forEach(function(action) {
            App.store.dispatch(action);
          });
        }
        var url = ajaxify.data.url.replace("loggedin", "");
        if (url.endsWith("?")) {
          url.slice(0, -1);
        }
        app.enterRoom(matchRooms(ajaxify.data.url), function() {});
      }
    });
  });
})();
