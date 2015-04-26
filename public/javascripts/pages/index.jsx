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
      Map = require('jsx!components/Map'),
      CreateControls = require('jsx!components/controls/CreateControls');

  window.console.log('map');
  window.console.log(Map);
  window.Map = Map;
  return React.createClass({
    _configureMap: function () {
      this._user = {}; 
      this._data = {};
      this._data.sequence = {};
      this._data.sequence.points = [];
      // console.log('user');
      // console.log(this._user);
      // console.log('data');
      // console.log(this._data);
      this._lat = localStorage.getItem('latitude') || null;
      this._lng = localStorage.getItem('longitude') || null;
      this._zoom = parseInt(localStorage.getItem('zoom') || null);
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
      return (
        <Grid id='page-container' fluid={true}>
          <NavBar/>
          <Row>
            <Col xs={12}> 
              <CreateControls/>
            </Col>
            <Col xs={12} className='map-container'>
              // Supposed placement of map.  Currently broken.
            </Col>
          </Row>
          // WARNING: This currently cannot be placed within a grid.  TODO: Research is required.
          <Map id="map-canvas"
               ref="map"
               edit={false} 
               latitude={this._lat}
               longitude={this._lng}
               zoom={this._zoom} 
               points={this._data.sequence.points}/>
        </Grid>
      );
    }
  });
})