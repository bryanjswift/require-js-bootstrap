/*!
 * data, a simple interface for interacting with data attributes
 * (c) Bryan J Swift 2012
 * https://github.com/bryanjswift/require-js-bootstrap
 * license MIT
 */
define(function() {

  function camelCase(str) {
    var i = str.indexOf('-');
    var result = str;
    while (i !== -1) {
      result = result.slice(0, i) + result.slice(i + 1, i + 2).toUpperCase() + result.slice(i + 2);
      i = result.indexOf('-');
    }
    return result;
  }

  function getData(node, name) {
    var value = false;
    var camelName = camelCase(name);
    if (node.dataset) { value = node.dataset[camelName]; }
    else if (node.getAttribute) { value = node.getAttribute('data-' + name); }
    return value;
  }

  var api = {
    get: getData
  };

  return api;
});
