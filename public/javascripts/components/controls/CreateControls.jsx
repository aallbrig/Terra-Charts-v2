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
  var AltLibrary = require('alt');
  var MapStore = require('stores/MapStore');

  return React.createClass({
    mixins: [AltLibrary.addons.FluxyMixin],
    statics: {
      storeListeners: {
        onMapStoreChange: MapStore
      }
    },
    onMapStoreChange: function () {
      window.console.log('Create controls recieves new map!');
      this.setState(this.getState);
    },
    getState: function () {
      window.console.log('Getting component state');
      window.console.log(MapStore.getState());
      return { map : MapStore.getState().map }
    },
    getInitialState: function () {
      return this.getState();
    },
    getDefaultProps: function () {
      return {
        id: 'create-controls',
        placement: google.maps.ControlPosition.TOP_RIGHT
      }
    },
    componentDidMount: function () {
      // This seems to break the reactJS.  Odd but I bet it has something to do with not having refs?
      // window.console.log('Time to add the controls to the map');
      // var centerControl = document.getElementById(this.props.id);
      // window.console.log(centerControl);
      // this.props.map.controls[this.props.placement].push(centerControl);
    },
    render : function() {
      var hasMap = (this.state.map)? true : false;
      // console.log(this.props.data);
      return (
        <div>
          {(hasMap) ? 
            <div id={this.props.id} className="panel create-controls">
              <ListGroupItem>
                <AddMarkerButton map={this.state.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <MapSettingsButton map={this.state.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <MyLocationButton map={this.state.map}/>
              </ListGroupItem>
              <ListGroupItem>
                <TrashButton map={this.state.map}/>
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