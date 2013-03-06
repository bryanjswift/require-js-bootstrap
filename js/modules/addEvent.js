define(function(require) {
  function addEvent(node, name, handler) {
    if (node && node.addEventListener) {
      node.addEventListener(name, handler);
    } else if (node && node.attachEvent) {
      node.attachEvent('on' + name, handler);
    } else if (window.console) {
      console.warn('no way to add event to', node, name);
    }
  }

  return addEvent;

});
