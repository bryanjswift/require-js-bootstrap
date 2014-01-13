define(function(require) {

  var clazz = require('modules/clazz');
  var evt = require('modules/dom-events');

  var defaults = {
    className: 'scheckbox',
    checkedClassName: 'scheckbox-checked',
    focusedClassName: 'scheckbox-focused'
  };

  function initCheckbox(el, opts) {
    if (!el) { return; }
    opts = opts || {};
    var elder = el.parentNode || el.parentElement;
    var wrapper = document.createElement('span');
    clazz.add(wrapper, opts.className || defaults.className);
    var clone = el.cloneNode();
    clone.checked = el.checked;
    initCheckboxEvents(wrapper, clone, opts);
    wrapper.appendChild(clone);
    elder.replaceChild(wrapper, el);
  }

  function initCheckboxEvents(wrapper, clone, opts) {
    if (clone.checked) { clazz.add(wrapper, opts.checkedClassName || defaults.checkedClassName); }
    evt.on(clone, 'change', function(e) {
      clazz.toggle(wrapper, opts.checkedClassName || defaults.checkedClassName);
    });
    evt.on(clone, 'focus', function(e) {
      clazz.add(wrapper, opts.focusedClassName || defaults.focusedClassName);
    })
    evt.on(clone, 'blur', function(e) {
      clazz.remove(wrapper, opts.focusedClassName || defaults.focusedClassName);
    })
  }

  return initCheckbox;

});
