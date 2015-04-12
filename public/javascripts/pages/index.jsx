/** @jsx React.DOM */
define(function(require){
  var React = require('react'),
      ReactBootstrap = require('reactBootstrap'),
      Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Jumbotron = ReactBootstrap.Jumbotron,
      Button = ReactBootstrap.Button,
      NavBar = require('jsx!components/NavBar'),
      Map = require('jsx!components/Map');

  return React.createClass({
    _configureMap: function () {
      this._user = {};
      this._data = {};
      this._data.sequence = {};
      this._data.sequence.points = [];
      console.log('user');
      console.log(this._user);
      console.log('data');
      console.log(this._data);
      this._lat = localStorage.getItem('latitude') || 60.38;
      this._lng = localStorage.getItem('longitude') || 89.12;
      this._zoom = parseInt(localStorage.getItem('zoom') || 9);
      this._mapType;
      if(localStorage.getItem('mapType') == null){
        this._mapType = "HYBRID";
        localStorage.setItem('mapType', this._mapType);
      } else {
        this._mapType = localStorage.getItem('mapType');
      }
    },

    render: function(){
      this._configureMap();
      var map = <Map id="map-canvas"
                     ref="map"
                     edit={false} 
                     latitude={this._lat}
                     longitude={this._lng}
                     zoom={this._zoom} 
                     points={this._data.sequence.points}/>
      // map.addControls('#map-controls')
      // window.console.log('map');
      // window.console.log(map);
      return (
        <span id='page-container'>
          <NavBar/>
          {map}
        </span>
      );
    }
  });
})