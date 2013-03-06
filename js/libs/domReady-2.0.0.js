/**
 * @license RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 *//*jslint *//*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */define(function(){function h(a){var b;for(b=0;b<a.length;b++)a[b](c)}function i(){var a=d;b&&a.length&&(d=[],h(a))}function j(){b||(b=!0,g&&clearInterval(g),i())}function l(a){return b?a(c):d.push(a),l}"use strict";var a=typeof window!="undefined"&&window.document,b=!a,c=a?document:null,d=[],e,f,g;if(a){if(document.addEventListener)document.addEventListener("DOMContentLoaded",j,!1),window.addEventListener("load",j,!1);else if(window.attachEvent){window.attachEvent("onload",j),f=document.createElement("div");try{e=window.frameElement===null}catch(k){}f.doScroll&&e&&window.external&&(g=setInterval(function(){try{f.doScroll(),j()}catch(a){}},30))}(document.readyState==="complete"||document.readyState==="interactive")&&j()}return l.version="2.0.0",l.load=function(a,b,c,d){d.isBuild?c(null):l(c)},l});