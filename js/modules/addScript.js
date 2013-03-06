define(function() {

  function addScript(id, src) {
    var d = document;
    var s = 'script';
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);
  }

  return addScript;
});
