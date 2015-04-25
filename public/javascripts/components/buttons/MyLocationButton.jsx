/** @jsx React.DOM */

define(function (require) {
  var React = require('react');
  var ReactBootstrap = require('reactBootstrap');
  var ListGroup = ReactBootstrap.ListGroup;
  var Modal = ReactBootstrap.Modal;
  var Button = ReactBootstrap.Button;
  var Input = ReactBootstrap.Input;
  var google = require('gmaps');


  var LoadingModal = React.createClass({
  render: function(){
      return (
        <div></div>
      );
    }
  });

  var MyLocationButton = React.createClass({
    setPosition: function(position){
      var map = this.props.map;
      window.console.log('recieved position!');
      window.console.log(position);
      map.setCenter(new google.maps.LatLng( position.coords.latitude, position.coords.longitude ));
    },
    handleClick: function (e){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition);
      } else {
        console.log('no navigator object');
      }
      console.log('setting center');
    },
    render : function() {
      return (
        <div className="btn" onClick={this.handleClick}>
          <i className="fa fa-dot-circle-o fa-2x"></i>
          <span className="hidden-xs"> My Location</span>
        </div>
      );
    }
  });

  return MyLocationButton;
});

