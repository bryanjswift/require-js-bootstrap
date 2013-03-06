define(['underscore', 'jquery'], function(_, $) {

  function updateDisplay(select, display, e) {
    var idx = select.selectedIndex;
    var option = select.options[idx];
    display.text(option.innerText);
  }

  function init(el) {
    if (!el) { return; }
    _.each(el.getElementsByTagName('select'), function(select) {
      var wrapper = $('<div class="select-wrapper"></div>');
      var display = $('<div class="select-display"></div>');
      var sel = $(select).clone(true);
      wrapper.append(sel);
      wrapper.append(display);
      sel.on('change', _.bind(updateDisplay, this, sel.get(0), display));
      updateDisplay(sel.get(0), display);
      $(select).replaceWith(wrapper);
    });
  }

  return init;
});
