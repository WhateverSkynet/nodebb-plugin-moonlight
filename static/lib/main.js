"use strict";

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
  var validUrls = ["/landing", "/roster", "/apply", "/applications"];
  //TODO: remove dependency on mui.js
  var script = document.createElement("script");
  script.setAttribute("src", "/src/modules/muicss.js");
  document.head.appendChild(script);
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "/src/modules/moonlight/style.css");
  document.head.appendChild(link);
  script.setAttribute("src", "//cdn.muicss.com/mui-0.7.5/js/mui.min.js");
  document.head.appendChild(script);
  var root = document.createElement("div");
  root.setAttribute("id", "moonlight-root");
  require(["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, App) {
    App.initSocket();

    ReactDOM.render(
      React.createElement(App.Page, {}),
      root
    );
  });
  var matchRooms = function (path) {
    switch (path) {
      case "/landing":
      return "mnl_landing";
      case "/roster":
      return "mnl_roster";
      case "/apply":
      return "mnl_apply";
      case "/applications":
      return "mnl_applications";
      default:
        "mnl";
    }
  };

  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["moonlight/bundle"], function (App) {
      if (validUrls.indexOf(ajaxify.data.url) !== -1) {
        document.getElementById("moonlight-content").appendChild(root);
        if (ajaxify.data.action) {
          App.store.dispatch(ajaxify.data.action)
        }
        var url = ajaxify.data.url.replace("loggedin", "");
        if (url.endsWith("?")) {
          url = url.slice(0, -1);
        }
        app.enterRoom(matchRooms(ajaxify.data.url), function() {});
        App.navigate(url);

      }

    });
  });
} ());