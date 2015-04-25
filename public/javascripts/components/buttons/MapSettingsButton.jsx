/** @jsx React.DOM */

define(function (require) {
  var React = require('react');
  var ReactBootstrap = require('reactBootstrap');
  var ListGroup = ReactBootstrap.ListGroup;
  var Modal = ReactBootstrap.Modal;
  var Button = ReactBootstrap.Button;
  var Input = ReactBootstrap.Input;
  var google = require('gmaps');


  var MapSettingsModal = React.createClass({
  handleRadioClick: function(e){
    var map = this.props.map;
    map.setMapTypeId(google.maps.MapTypeId[e.target.value]);
    localStorage.setItem('mapType', e.target.value);
  },
  render: function() {
    return (
        <Modal className="map-settings_modal" title="Change the Map" animation={true} 
                                                                    closeButton={true}
                                                                    onRequestHide={this.props.onRequestHide}>
          <div className="map-settings_modal_body modal-body row">
            <Input name="map-settings-group" type="radio" value="SATELLITE" label="Satellite Only" onClick={this.handleRadioClick}/>
            <Input name="map-settings-group" type="radio" value="HYBRID" label="Satellite With Labels"  onClick={this.handleRadioClick}/>
            <Input name="map-settings-group" type="radio" value="ROADMAP" label="Road Map" onClick={this.handleRadioClick}/>
            <Input name="map-settings-group" type="radio" value="TERRAIN" label="Road Map with Terrain" onClick={this.handleRadioClick}/>
          </div>
          <div className="modal-footer">
            <Button bsStyle="primary" onClick={this.props.onRequestHide}>Okay!</Button>
          </div>
        </Modal>
      );
  }
});


var MapSettingsButton = React.createClass({
  getInitialState: function() {
    return {
      showModal: false,
      active: false
    };
  },
  toggleModal: function(){
    this.setState({showModal: !this.state.showModal});
  },
  render : function() {
    var showModal = this.state.showModal;
    return (
      <div>
        <div className="btn" onClick={this.toggleModal}>
          <i className="fa fa-globe fa-2x"></i>
          <span className="hidden-xs"> Map Settings</span>
        </div>
        {(showModal === true)?
            <MapSettingsModal onRequestHide={this.toggleModal}
                              map={this.props.map} />
          : ''}
      </div>
    );
  }
});

  return MapSettingsButton;

});

