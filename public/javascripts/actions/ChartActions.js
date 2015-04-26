'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

define(function (require) {
  'use strict';
  var AltSingleton = require('../AltSingleton');

  var MapActions = (function () {
    function MapActions() {
      _classCallCheck(this, MapActions);
    }

    _createClass(MapActions, [{
      key: 'mapCreated',
      value: function mapCreated(map) {
        window.console.log('Action received map!  Passing it on now');
        window.console.log(map);
        this.dispatch(map);
      }
    }, {
      key: 'addDrawLinesListener',
      value: function addDrawLinesListener() {
        window.console.log('Adding draw listener');
        this.dispatch();
      }
    }]);

    return MapActions;
  })();

  window.console.log('AltSingleton from within ChartActions');
  window.console.log(AltSingleton);
  window.AltSingleton = AltSingleton;
  return AltSingleton.createActions(MapActions);
});