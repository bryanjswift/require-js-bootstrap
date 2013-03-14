/*!
 * clazz, a simple interface for interacting with class attributes
 * (c) Bryan J Swift 2012
 * https://github.com/bryanjswift/require-js-bootstrap
 * license MIT
 */
define(function() {
  var hasTrim = !!String.prototype.trim;

  function addClass(node, className) {
    if (!hasClass(node, className)) {
      node.className = node.className + ' ' + className;
    }
  }

  function hasClass(node, className) {
    var orig = node.className;
    return node.className.replace(className, '') !== orig;
  }

  function removeClass(node, className) {
    if (hasTrim) {
      node.className = node.className.replace(className, '').trim();
    } else {
      node.className = node.className.replace(className, '');
    }
  }

  function toggleClass(node, className) {
    if (hasClass(node, className)) {
      removeClass(node, className);
    } else {
      addClass(node, className);
    }
  }

  var api = {
    add: addClass,
    has: hasClass,
    remove: removeClass,
    toggle: toggleClass
  };

  return api;
});
