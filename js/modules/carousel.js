/*!
 * Carousel, a basic rotating view
 * (c) Bryan J Swift 2012
 * https://github.com/bryanjswift/require-js-bootstrap
 * license MIT
 */
define(
  ['underscore', 'modules/clazz', 'modules/addEvent', 'modules/data-attrs'],
  function(_, clazz, addEvent, data) {
    var root = false;
    var nav = document.querySelector('.carousel-nav');
    var items = [];
    var jumps = [];
    var jumpsEl = document.querySelector('.carousel-jumps');
    var nextEl = false;
    var previousEl = false;
    var count = items.count;

    var autoTimeout = 0;
    var currentIdx = 0;
    var isAuto = false;

    function auto() {
      handler('next', {});
      if (isAuto) {
        autoTimeout = _.delay(auto, 5000);
      }
    }

    function createButton(type) {
      var button = document.querySelector('.carousel-button-' + type);
      addEvent(button, 'click', _.bind(handler, button, type));
      return button;
    }

    function handler(type, e) {
      var idx = currentIdx;
      if (type === 'next') {
        idx = idx + 1;
      } else if (type === 'previous') {
        idx = idx - 1;
      }
      if (idx === jumps.length) {
        idx = 0;
      } else if (idx < 0) {
        idx = jumps.length - 1;
      }
      selectItem.apply(jumps[idx], [idx, e]);
    }

    function initialize(el, opts) {
      root = el;
      opts = opts || {};
      items = (root.querySelectorAll ? root : document).querySelectorAll('.carousel-item');
      count = items.length;
      jumps = opts.jumps || [];
      if (count > 1) {
        _.each(items, initItem);
        initButtons();
        selectItem.apply(jumps[0], [0, {}]);
        addEvent(root, 'click', stopAuto);
        if (isAuto) { autoTimeout = _.delay(auto, 5000); }
        clazz.add(root, 'carousel-navved');
      }
    }

    function initButtons() {
      nextEl = createButton('next');
      previousEl = createButton('previous');
    }

    function createJumpLink(i) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#item-' + i;
      link.innerHTML = (i + 1) + '';
      li.appendChild(link);
      jumpsEl.appendChild(li);
      jumps.push(link);
      return link;
    }

    function initItem(item, i) {
      var link = jumps[i] || createJumpLink(i);
      clazz.add(link, 'carousel-jump');
      if (i === (count - 1)) { clazz.add(link, 'carousel-jump-last'); }
      addEvent(link, 'click', _.bind(selectItem, link, i));
    }

    function selectItem(idx, e) {
      var prev = idx - 1;
      var next = idx + 1;
      if (prev < 0) { prev = count - 1; }
      if (next >= count) { next = 0; }
      if (e && e.preventDefault) { e.preventDefault(); }
      e.returnValue = false;

      clearTimeout(autoTimeout);
      if ('undefined' !== typeof e.type) {
        // If they interact with it, stop auto rotating
        isAuto = false;
      }

      _.each(items, function(item, i) {
        if (idx > i) {
          clazz.remove(item, 'carousel-active');
          clazz.remove(item, 'carousel-next');
          clazz.add(item, 'carousel-prev');
        } else if (idx === i) {
          clazz.add(item, 'carousel-active');
          clazz.remove(item, 'carousel-next');
          clazz.remove(item, 'carousel-prev');
        } else {
          clazz.remove(item, 'carousel-active');
          clazz.add(item, 'carousel-next');
          clazz.remove(item, 'carousel-prev');
        }
      });

      _.each(jumps, function(link) { clazz.remove(link, 'carousel-jump-active'); });
      clazz.add(this, 'carousel-jump-active');
      currentIdx = idx;
    }

    function stopAuto(e) {
      clearTimeout(autoTimeout);
      isAuto = false;
    }

    return initialize;
  }
);
