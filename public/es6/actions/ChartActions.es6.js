define(function (require) {
  'use strict';
  var AltSingleton = require('../AltSingleton');

  class MapActions {
    mapCreated (map) {
      window.console.log('Action received map!  Passing it on now');
      window.console.log(map);
      this.dispatch(map);
    }

    addDrawLinesListener () {
      window.console.log('Adding draw listener'); 
      this.dispatch(); 
    }
  }

  window.console.log('AltSingleton from within ChartActions');
  window.console.log(AltSingleton);
  window.AltSingleton = AltSingleton;
  return AltSingleton.createActions(MapActions);
});

