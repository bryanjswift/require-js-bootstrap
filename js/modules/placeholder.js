define(['underscore', 'modules/domEvents', 'modules/clazz'], function(_, evt, clazz) {
  function polyfill(el) {
    var txt = '';
    var val = false;
    if ('undefined' !== typeof el.getAttribute) {
      txt = el.getAttribute('placeholder');
      val = el.value;
      if (!val || val === txt) {
        clazz.add(el, 'placeholder');
        el.value = txt;
      }
      evt.on(el, 'focus', _.bind(focused, this, el));
      evt.on(el, 'blur', _.bind(blurred, this, el));
    }
  }

  function focused(el, e) {
    var txt = el.getAttribute('placeholder');
    var val = el.value;
    if (val === txt) {
      el.value = '';
    }
  }

  function blurred(el, e) {
    var txt = el.getAttribute('placeholder');
    var val = el.value;
    if (val === '' || val === txt) {
      el.value = txt;
    }
  }

  return polyfill;
});
