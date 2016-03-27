
requirejs.config({
  paths: {
    text: 'lib/text'
  }
});

require(['app'],
  function(App) {

      new App(document.getElementById("canvas"));

  }
);
