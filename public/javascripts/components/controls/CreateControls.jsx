/** @jsx React.DOM */

define(function (require) {
  var React = require('react');
  var ReactBootstrap = require('reactBootstrap');
  var ListGroup = ReactBootstrap.ListGroup;
  var ListGroupItem = ReactBootstrap.ListGroupItem;
  var AddMarkerButton = require('jsx!components/buttons/AddMarkerButton');
  var MapSettingsButton = require('jsx!components/buttons/MapSettingsButton');
  var MyLocationButton = require('jsx!components/buttons/MyLocationButton');
  var TrashButton = require('jsx!components/buttons/TrashButton');
  var DrawLinesButton = require('jsx!components/buttons/DrawLinesButton');

  return React.createClass({
    getDefaultProps: function () {
      return {
        id: 'create-controls',
        placement: google.maps.ControlPosition.TOP_RIGHT
      }
    },
    componentDidMount: function () {
      window.console.log('Time to add the controls to the map');
      var centerControl = document.getElementById(this.props.id);
      window.console.log(centerControl);
      this.props.map.controls[this.props.placement].push(centerControl);
    },
    render : function() {
      var hasMap = (this.props.map)? true : false;
      console.log(this.props.data);
      return (
        <div>
          {(hasMap) ? 
            <div id={this.props.id} className="panel create-controls">
              <ListGroupItem>
                <AddMarkerButton map={this.props.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <MapSettingsButton map={this.props.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <MyLocationButton map={this.props.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <TrashButton map={this.props.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <DrawLinesButton />
              </ListGroupItem>
            </div>
          : null }
        </div>
      );
    }
  });

});