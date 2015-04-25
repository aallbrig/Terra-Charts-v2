/** @jsx React.DOM */

define(function (require) {
  var React = require('react');
  var ReactBootstrap = require('reactBootstrap');
  var ListGroup = ReactBootstrap.ListGroup;
  var Modal = ReactBootstrap.Modal;
  var Button = ReactBootstrap.Button;


  var MarkerSelectorModal = React.createClass({
    render: function() {
      var _this = this;
      return (
          <Modal className="marker-selection_modal" title="Choose Marker" animation={true} closeButton={true} onRequestHide={this.props.onRequestHide}>
            <div className="marker-selection_modal_body modal-body row">
              {this.props.images.map(function(image, index){
                return <div onClick={_this.props.selectMarkerImage} className="col-xs-3 col-sm-2 text-center">
                  <i data-id={image.id} data-image={JSON.stringify(image)} className={"fa fa-"+image.name+" fa-3x"}></i>
                </div>
              })}
            </div>
            <div className="modal-footer">
              <Button bsStyle="primary" onClick={this.props.onRequestHide}>Close</Button>
            </div>
          </Modal>
        );
    }
  });

  var AddMarkerButton = React.createClass({
    toggleModal: function(){
      this.setState({showModal: !this.state.showModal});
    },
    onClick: function(e){
      var map = this.props.map;
      if(this.state.active){
        this.setState({active: false});
      } else {
        this.setState({active: true});
        this.toggleModal();
      }
    },
    selectMarkerImage: function(markerImage) {
      var selectedImage = JSON.parse(markerImage.target.getAttribute('data-image'));
      var map = this.props.map;
      this.toggleModal();
      // TODO: These functions no longer work.  Create workaround to set a marker on gmap
      // (probably directly manipulating the map within here by includeing `require('gmaps')`)
      // map.setNewMarkerImage(selectedImage['32_filepath']);
      // map.toggleAddMarker();
    },

    componentDidMount: function(){
      // TODO: Plug in AJAX call
      // $.get('/api/images', function(data){
      //   _this.setState({images: data});
      // });
      this.setState({images: []});
    },
    getInitialState: function() {
      return {
        showModal: false
      };
    },
    render : function() {
      var showModal = this.state.showModal;
      return (
        <div>
          <div className="btn" onClick={this.onClick}>
            <i className={(this.state.showModal)?"text-success fa fa-map-marker fa-2x":"fa fa-map-marker fa-2x"}></i>
            <span className={(this.state.showModal)?"hidden-xs text-success":"hidden-xs"}> Add a Marker</span>
          </div>
          {(showModal === true)?
            <MarkerSelectorModal images={this.state.images} 
                                 onRequestHide={this.toggleModal}
                                 selectMarkerImage={this.selectMarkerImage} />
          : ''}
        </div>
      );
    }
  });

  return AddMarkerButton;

});

