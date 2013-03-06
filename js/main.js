(function() {

  requirejs.config({
    map: {
      '*': {
        'domReady': 'libs/domReady-2.0.0',
        'jquery': 'libs/jquery-1.8.2.min',
        'moment': 'libs/moment-1.7.2',
        'reqwest': 'libs/reqwest-0.4.5',
        'spin': 'libs/spin-1.2.5',
        'underscore': 'libs/underscore-1.3.3'
      }
    },
    shim: {
      'libs/jquery-1.8.2.min': {
        exports: '$'
      },
      'libs/moment-1.7.2': {
        exports: 'moment'
      },
      'libs/spin-1.2.5': {
        exports: 'Spinner'
      }
    }
  });

  require(['domReady'], function(domready) {
    domready(function() {
      require(['pages/' + document.body.id], function(page) {
        // Run page init
        if ('function' === typeof page) { page(); }
        if (page && ('function' === typeof page._init)) { page._init(); }

        // Run subsection functions
        var names = document.body.className.split(' ');
        var i, name;
        for (i = 0; i < names.length; i++) {
          name = names[i];
          if (page && ('function' === typeof page[name])) { page[name](); }
        }
      });
    });
  });

})();
