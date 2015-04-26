define(function (require) {
  'use strict';
  var AltSingleton = require('../AltSingleton');
  var ChartActions = require('actions/ChartActions');
  var google = require('gmaps');

  class MapStore {
    constructor() {
      this.bindListeners({
        setMap: ChartActions.mapCreated,
        enableDrawLines: ChartActions.addDrawLinesListener
      });

      this.map = null;
    }

    setMap (map) {
      // window.console.log('Setting map!');
      // window.console.log(map);
      this.map = map;
    } 

    enableDrawLines () {
      window.console.log('Enabling drawing of lines');
      
      var flightPlanCoordinates = [
        new google.maps.LatLng(37.772323, -122.214897),
        new google.maps.LatLng(21.291982, -157.821856),
        new google.maps.LatLng(-18.142599, 178.431),
        new google.maps.LatLng(-27.46758, 153.027892)
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      // window.console.log(this);

      flightPath.setMap(this.map);
    }
  }

  return AltSingleton.createStore(MapStore, 'MapStore');
});

