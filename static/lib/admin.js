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
  script.setAttribute("src", "//cdn.muicss.com/mui-0.7.5/js/mui.min.js");
  document.head.appendChild(script);
  var root = document.createElement("div");
  root.setAttribute("id", "moonlight-root");
  require(["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, App) {
    App.initSocket();

    ReactDOM.render(
      React.createElement(App.AdminPage, {}),
      root
    );
  });

  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["moonlight/bundle"], function (App) {
      if (ajaxify.data.url.startsWith("/admin/plugins/moonlight")) {
        document.getElementById("moonlight-content").appendChild(root);
        if (ajaxify.data.action) {
          App.store.dispatch(ajaxify.data.action)
        }
        var url = ajaxify.data.url.replace("loggedin", "");
        if (url.endsWith("?")) {
          url = url.slice(0, -1);
        }
        app.enterRoom("mnl.admin", function() {});
        App.navigate(url);

      }

    });
  });
} ());