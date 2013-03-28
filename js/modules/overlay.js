/*!
 * overlay, a baseline for displaying modal content
 * (c) Bryan J Swift 2012
 * https://github.com/bryanjswift/require-js-bootstrap
 * license MIT
 */
define(
  ['underscore', 'modules/domEvents', 'modules/clazz', 'modules/data-attrs', 'modules/addScript'],
  function(_, evt, clazz, data, addScript) {

    window.onYouTubeIframeAPIReady = apiCallbackYoutube;
    addScript("youtube-api", "//www.youtube.com/iframe_api");

    var players = [];
    var m = JSON.stringify({ 'method': 'pause' });
    var de = document.documentElement;
    var backdrop = document.querySelector('.overlay-backdrop');
    resize();
    evt.on(backdrop, 'click', closeOverlay);

    function apiCallbackYoutube() {
      _.each(document.querySelectorAll('.youtube'), function(frame) {
        players.push(new YT.Player(frame, {}));
      });
    }

    function resize(e) {
      backdrop.setAttribute('style', 'height: ' + de.clientHeight + 'px; width: ' + de.clientWidth + 'px;');
    }

    function overlayKeypress(e) {
      if (e.keyCode === 27) { closeOverlay(e); }
    }

    function closeOverlay(e, leaveOverlay) {
      if (e && e.preventDefault) { e.preventDefault(); }
      e.returnValue = false;

      _.each(players, function(player) { if (player && player.stopVideo) { player.stopVideo(); } });
      _.each(document.querySelectorAll('.vimeo'), function(f) { f.contentWindow.postMessage(m, '*'); });

      if (!leaveOverlay) { clazz.remove(backdrop, 'backdrop-visible'); }

      _.each(document.querySelectorAll('.overlay'), function(overlay) {
        clazz.remove(overlay, 'overlay-visible');
      });

      evt.off(window, 'keyup', overlayKeypress);
      evt.off(window, 'resize', resize);
    }

    function triggerOverlay(a, e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      e.returnValue = false;

      closeOverlay(e, true);
      var id = getHref(a).replace(/^.*#(.*)$/, '$1');
      clazz.add(document.getElementById(id), 'overlay-visible');
      clazz.add(backdrop, 'backdrop-visible');
      evt.on(window, 'keyup', overlayKeypress);
      evt.on(window, 'resize', resize);
    }

    function initAllOverlays() {
      _.each(document.querySelectorAll('.overlay-trigger'), initOverlay);
      if (window.mixpanel) {
        mixpanel.track_links('.overlay-trigger', 'Open Overlay', function(a) {
          return { href: a.getAttribute('href') };
        });
        mixpanel.track_links('.overlay-close', 'Close Overlay', function(a) {
          var parentNode = a.parentNode || a.parentElement;
          return { href: '#' + parentNode.getAttribute('id') };
        });
      }
    }

    function initOverlay(a) {
      var id = getHref(a).replace(/^.*#(.*)$/, '$1');
      if (!id) { return; }
      var overlay = document.getElementById(id);
      document.body.appendChild(overlay);
      var close = overlay.querySelector('.overlay-close');
      evt.on(close, 'click', closeOverlay);
      evt.on(a, 'click', _.bind(triggerOverlay, this, a));
    }

    function getHref(a) {
      return a.href || a.getAttribute('href') || data.get(a, 'href');
    }

    return {
      initAll: initAllOverlays,
      init: initOverlay
    };

  }
);
