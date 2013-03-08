/*!
 * domEvents, a simple interface for interacting with DOM events
 * (c) Bryan J Swift 2012
 * https://github.com/bryanjswift/require-js-bootstrap
 * license MIT
 */
define(function() {

  // Functions taken from http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
      obj["e" + type + fn] = fn;
      obj[type + fn] = function() { obj["e" + type + fn](window.event); };
      obj.attachEvent("on" + type, obj[type + fn]);
    }
  }

  function removeEvent(obj, type, fn) {
    if (obj.removeEventListener) {
      obj.removeEventListener(type, fn, false);
    } else if (obj.detachEvent) {
      obj.detachEvent("on" + type, obj[type + fn]);
      obj[type + fn] = null;
      obj["e" + type + fn] = null;
    }
  }

  function stopEvent(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e) { e.returnValue = false; }
  }

  return {
    off: removeEvent,
    on: addEvent,
    stop: stopEvent
  };

});
