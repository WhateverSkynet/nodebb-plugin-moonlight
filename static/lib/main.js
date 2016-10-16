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
  script.setAttribute("src", "//cdn.muicss.com/mui-0.7.5/js/mui.min.js");
  document.head.appendChild(script);

  require(["moonlight/bundle"], function (App) {
    App.initSocket();

  });
  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["moonlight/bundle"], function (App) {
      if (validUrls.indexOf(ajaxify.data.url) !== -1) {

        if (ajaxify.data.action) {
          App.store.dispatch(ajaxify.data.action)
        }
        var url = ajaxify.data.url.replace("loggedin", "");
        if (url.endsWith("?")) {
          url = url.slice(0, -1);
        }
        App.navigate(url);
      }

    });
  });
} ());

define("forum/apply", ["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, Moonlight) {

  var Page = {};

  Page.init = function () {

    ReactDOM.render(
      React.createElement(Moonlight.Page, {}),
      document.getElementById("moonlight-content")
    );

  }

  return Page;
});


define("forum/landing", ["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, Moonlight) {

  var Page = {};

  Page.init = function () {


    ReactDOM.render(
      React.createElement(Moonlight.Page, {}),
      document.getElementById("moonlight-content")
    );

  }

  return Page;
});

define("forum/roster", ["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, Moonlight) {

  var Page = {};

  Page.init = function () {


    ReactDOM.render(
      React.createElement(Moonlight.Page, {}),
      document.getElementById("moonlight-content")
    );

  }

  return Page;
});