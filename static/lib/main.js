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
  var validUrls = ["/landing", "/apply", "/roster"];
  $(window).on("action:ajaxify.contentLoaded", function (data) {

    require(["moonlight/bundle"], function (App) {
      window.Moonlight = App;

      if (validUrls.indexOf(ajaxify.data.url) !== -1) {
        App.navigate(ajaxify.data.url);
      }

    });
  });


  console.log("nodebb-plugin-moonlight: loaded");
  // Note how this is shown in the console on the first load of every page


} ());

//const registerPage = (name) => {

// define(name, ["react", "reactDOM", "moonlight/bundle"], function (React, ReactDOM, Moonlight) {

//   var Page = {};

//   Page.init = function () {

//     ReactDOM.render(
//       React.createElement(Moonlight.Page, {}),
//       document.getElementById("moonlight-content")
//     );

//   }

//   return Page;
// });

// };


// registerPage("forum/apply");
// registerPage("form/landing");

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