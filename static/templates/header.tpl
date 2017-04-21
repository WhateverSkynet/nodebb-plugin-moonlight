<!DOCTYPE html>
<html lang="{function.localeToHTML, defaultLang}">

<head>
	<title>{browserTitle}</title>
	<!-- BEGIN metaTags -->{function.buildMetaTag}
	<!-- END metaTags -->
	<link rel="stylesheet" type="text/css" href="{relative_path}/stylesheet.css?{config.cache-buster}" />
	<link rel="stylesheet" type="text/css" href="{relative_path}/src/modules/moonlight/moonlight.css?{config.cache-buster}" />
	<!-- IF bootswatchCSS -->
	<link id="bootswatchCSS" href="{bootswatchCSS}" rel="stylesheet" media="screen">
	<!-- ENDIF bootswatchCSS -->
	<!-- BEGIN linkTags -->{function.buildLinkTag}
	<!-- END linkTags -->

	<!--[if lt IE 9]>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.min.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
  		<script>__lt_ie_9__ = 1;</script>
	<![endif]-->

	<script>
		var RELATIVE_PATH = "{relative_path}";
		var config = JSON.parse('{{configJSON}}');
		var app = {
			template: "{template.name}",
			user: JSON.parse('{{userJSON}}')
		};
	</script>
	<script src="{relative_path}/nodebb.min.js?{config.cache-buster}"></script>
	<!-- IMPORT partials/requirejs-config.tpl -->

	<!-- BEGIN scripts -->
	<script type="text/javascript" src="{scripts.src}"></script>
	<!-- END scripts -->

	<!-- IF useCustomJS -->
	{{customJS}}
	<!-- ENDIF useCustomJS -->
	<!-- IF useCustomCSS -->
	<style type="text/css">
	{{customCSS}}
	</style>
	<!-- ENDIF useCustomCSS -->
</head>

<body class="{bodyClass} skin-{config.bootswatchSkin}">
	<div class="header-container">

		<div class="header container">
			<div class="header-row hidden-xs">
				<a class="logo-wrapper" href="<!-- IF brand:logo:url -->{brand:logo:url}<!-- ELSE -->{relative_path}/<!-- ENDIF brand:logo:url -->">
					<img alt="{brand:logo:alt}" class="{brand:logo:display} logo" src="{brand:logo}" />
				</a>
			</div>
			<div class="menu">
				<!-- IMPORT partials/menu.tpl -->
			</div>
		</div>
	</div>
	<nav id="menu" class="hidden">
		<section class="menu-profile">
			<!-- IF user.uid -->
			<!-- IF user.picture -->
			<img src="{user.picture}" />
			<!-- ELSE -->
			<div class="user-icon" style="background-color: {user.icon:bgColor};">{user.icon:text}</div>
			<!-- ENDIF user.picture -->
			<i component="user/status" class="fa fa-fw fa-circle status {user.status}"></i>
			<!-- ENDIF user.uid -->
		</section>

		<section class="menu-section">
			<h3 class="menu-section-title">[[global:header.navigation]]</h3>
			<ul class="menu-section-list">
				<li>
					<a href="/apply">Apply</a>
				</li>
				<!-- IF !config.loggedIn -->
				<li>
					<a href="/register">Register</a>
				</li>
				<li>
					<a href="/login">Login</a>
				</li>
				<!-- IF !config.loggedIn -->
			</ul>
		</section>

		<!-- IF config.loggedIn -->

		<section class="menu-section">
			<h3 class="menu-section-title">Tools</h3>
			<ul class="menu-section-list">
				<li>
					<a href="/applications">Applications</a>
				</li>
				<li>
					<a href="/roster">Roster</a>
				</li>
			</ul>
		</section>

		<section class="menu-section" data-section="profile">
			<h3 class="menu-section-title">[[global:header.profile]]</h3>
			<ul class="menu-section-list" component="header/usercontrol"></ul>
		</section>

		<section class="menu-section" data-section="notifications">
			<h3 class="menu-section-title">
				[[global:header.notifications]]
				<span class="counter" component="notifications/icon" data-content="0"></span>
			</h3>
			<ul class="menu-section-list notification-list-mobile" component="notifications/list"></ul>
			<p class="menu-section-list"><a href="{relative_path}/notifications">[[notifications:see_all]]</a></p>
		</section>

		<section class="menu-section" data-section="chats">
			<h3 class="menu-section-title">
				[[global:header.chats]]
				<i class="counter" component="chat/icon" data-content="0"></i>
			</h3>
			<ul class="menu-section-list chat-list"></ul>
		</section>
		<!-- ENDIF config.loggedIn -->
	</nav>

	<main id="panel">
		<div class="container" id="content">
			<!-- IMPORT partials/noscript/warning.tpl -->