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

  var root = document.createElement("div");
  root.setAttribute("id", "moonlight-root");
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "/plugins/nodebb-plugin-moonlight/public/admin.css");
  document.head.appendChild(link);

  require(["/plugins/nodebb-plugin-moonlight/public/main.js"], function (App) {
    App.initSocket();

    App.renderAdmin(root);
  });

  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["/plugins/nodebb-plugin-moonlight/public/main.js"], function (App) {
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