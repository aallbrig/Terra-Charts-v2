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

  return React.createClass({
    render : function() {
      var hasMap = (this.props.map)? true : false;
      console.log(this.props.data);
      return (
        <div>
          {(hasMap) ? 
            <div className="panel create-controls">
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
            </div>
          : null }
        </div>
      );
    }
  });

});