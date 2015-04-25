/** @jsx React.DOM */
define(function(require){
  var React = require('react'),
      ReactBootstrap = require('reactBootstrap'),
      Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Navbar = ReactBootstrap.Navbar,
      Nav = ReactBootstrap.Nav,
      NavItem = ReactBootstrap.NavItem,
      DropdownButton = ReactBootstrap.DropdownButton,
      MenuItem = ReactBootstrap.MenuItem,
      CollapsableNav = ReactBootstrap.CollapsableNav,
      google = require('gmaps'),
      $ = require('jquery');

  window.console.log('google');
  window.console.log(google);

  var EditMarkerInfoWindowModal = React.createClass({
    getInitialState: function () {
      return {
        showInformationWindowEdit: false,
        yes: false
      };
    },
    updateTitle: function (e) {
      var markerModel = this.props.markerModel;
    },
    updateInfoWindow: function (e) {
      var markerModel = this.props.markerModel;
      markerModel.set('infoWindow', {
        content: e.target.value
      });
      // console.log(markerModel.get('infoWindow')['content']);
    },
    handleRadioClick: function (e) {
      var markerModel = this.props.markerModel;
      // console.log(markerModel.get('infoWindow'));
      if(e.target.value == "Yes"){
        markerModel.createInfoWindow();
      } else if(e.target.value == "No") {
        markerModel.destroyInfoWindow();
      }
      this.setState({yes: (e.target.value == "Yes")? true : false});
    },
    handleSubmit: function (e){
      e.preventDefault();
      var markerModel = this.props.markerModel;
      var map = this.props.map;
      markerModel.save(function(data){
        // console.log('data');
        // console.log(data);
      });
      this.props.onRequestHide();
    },
    render : function() {
      var marker = this.props.marker;
      var markerModel = this.props.markerModel;
      // console.log(markerModel);
      // console.log(markerModel.get('infoWindow'));
      var showInformationWindowEdit = this.state.showInformationWindowEdit;
      var infoWindowContent = markerModel.get('infoWindow')['content'];
      return (
        <Modal className="marker-selection_modal" title="Edit Marker Information" animation={true} closeButton={true} onRequestHide={this.props.onRequestHide}>
          <form>
            <div className="marker-selection_modal_body modal-body row">
                <Label>Title</Label>
                <Input type="text" defaultValue={markerModel.get('title')}/>
                <Label>Add Information Window?</Label>
                <Input name="map-settings-group" checked={this.state.yes} type="radio" value="Yes" label="Yes" onClick={this.handleRadioClick}/>
                <Input name="map-settings-group" checked={!this.state.yes} type="radio" value="No" label="No"  onClick={this.handleRadioClick}/>
                <Label>Description</Label>
                <Input type="textarea" onChange={this.updateInfoWindow} value={infoWindowContent}/>
            </div>
            <div className="modal-footer">
              <Input type="submit" bsStyle="primary" onClick={this.handleSubmit} value="Done!"/>
            </div>
          </form>
        </Modal>
      );
    }
  });





  var Map = React.createClass({
    getInitialState: function() {
      return {
        map : null,
        markers : [],
        infoWindow: new google.maps.InfoWindow(),
        newMarkerImage: '',
        addMarkers: false,
        fullscreen: true
      };
    },

    getDefaultProps: function() {
      return {
        latitude: 0,
        longitude: 0,
        zoom: 4,
        points: [],
        gmaps_api_key: '',
        gmaps_sensor: false,
        edit: true
      }
    },

    createMap: function() {
      var mapOptions = {
          zoom: this.props.zoom || 4,
          center: new google.maps.LatLng( this.props.latitude || -25.363882,  this.props.longitude || 131.044922),
          disableDefaultUI: false,
          panControl: mobilecheck()?false:true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          overviewMapControl: false,
          disableDoubleClickZoom: mobilecheck()?true:true,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };
      var mapDiv = $('#' + this.getDOMNode().id)[0];
      window.console.log('mapDiv');
      window.console.log(mapDiv);
      // mapDiv[0].gmap(mapOptions).bind('init', function () {});
      // map = $(mapDiv).gmap('get', 'map');
      var map = new google.maps.Map(mapDiv, mapOptions);
      window.console.log('map');
      window.console.log(map);
      window.console.log('google');
      window.console.log(google);
      google.maps.event.addListener(map, "idle", function(e) {
        // console.log("projection:"+map.getProjection())
        // console.log(map.getProjection());
        console.log('idle fires');
        // console.log(map.getCenter());
        // console.log(map.getCenter().lat());
        // console.log(map.getCenter().lng());
        // console.log(map.getZoom());
        
        localStorage.setItem('longitude',map.getCenter().lng());
        localStorage.setItem('latitude',map.getCenter().lat());
        localStorage.setItem('zoom',map.getZoom());
      });
      google.maps.event.addListener(map, "click", function(e) {
        window.console.log('clicked the map!');
      });
      this.setState( { map : map,
                       mapDiv: mapDiv });
      if (this.props.getMap) {
        window.console.log('getMap FN detected!');
        this.props.getMap(map);
      }
      this.updateMarkers(this.props.points);
    },

    componentDidMount : function() {
      var _this = this;

      if (typeof google !== 'undefined') {
        // scripts already loaded, create map immediately
        this.createMap()
      } else {
        if (!window.reactMapCallback) {
          var s = document.createElement('script');
          s.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.gmaps_api_key + '&sensor=' + this.props.gmaps_sensor + '&callback=reactMapCallback';
          document.head.appendChild(s);
          window.reactMapCallbacks = []
          window.reactMapCallback = function(){
            while (window.reactMapCallbacks.length > 0)
              (window.reactMapCallbacks.shift())() // remove from front
          }
        }
        // add a callback to the end of the chain
        window.reactMapCallbacks.push(createMap);
      }
    },

    // update markers if needed
    componentWillReceiveProps : function(props) {
      console.log('updating markers');
      if( props.points ) this.updateMarkers(props.points);
      console.log('props updated');
    },

    createMarker: function(marker, point, markerModel) {
      var _this = this;
      var map = this.state.map;
      var markerModel = markerModel;
      google.maps.event.addListener(marker, 'click', function(e) {
        // console.log(e);
        // console.log(e.pixel);
        // var x = e.pixel.x;
        // var y = e.pixel.y;
        if(point.content){
          infoWindow.setContent(point.content);
          infoWindow.open(map,marker);
          google.maps.event.addListener(infoWindow,'closeclick',function(a, b, c){
             console.log('returned');
             console.log(a,b,c);
             map.setCenter(marker.latLng());
             // then, remove the infowindows name from the array
          });
        }
        if(marker.getAnimation() == google.maps.Animation.BOUNCE){
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      });
      google.maps.event.addListener(marker, 'dblclick', function(e) {
        // if(_this.props.edit){
        //   var div = document.createElement('div');
        //   document.body.appendChild(div);
        //   var modal = React.render(<EditMarkerInfoWindowModal marker={marker} markerModel={markerModel} map={map} onRequestHide={function(){div.remove();}}/>, div);
        // } else {
        //   console.log('presentation view');
        // }
      });
      google.maps.event.addListener(marker,'dragend',function(e) {
        // console.log('data before');
        // console.log(data);
        markerModel.set('latitude', e.latLng.lat());
        markerModel.set('longitude', e.latLng.lng());
        // console.log('data after');
        // console.log(data);
        // document.getElementById('lat').value = e.latLng.lat();
        // document.getElementById('lng').value = e.latLng.lng();
      });
    },
    destroyMarker: function(identifier){
      var markers = this.state.markers;
      if(identifier.markerModel) {
        // console.log('markerModel');
      } else if (identifier.marker) {
        // console.log('marker');
      } else {
        // console.log('no idea what to do with this');
      }
    },
    // Component API (will be used by other components (but they should probably be mixins))
    setNewMarkerImage: function(markerImage){
      this.setState({newMarkerImage: markerImage});
    },
    toggleAddMarker: function(){
      var markers = this.state.markers;
      var map = this.state.map;
      var _this = this;
      this.setState({addMarkers:!this.state.addMarkers}, function(){
        if(_this.state.addMarkers == true){
          var point = {};
          google.maps.event.addListener(map, 'click', function(e) {
            var markerModel = new MarkerModel({latitude: e.latLng.lat(), 
                                               longitude: e.latLng.lng(),
                                               icon: _this.state.newMarkerImage || ''});
            // console.log('marker');
            var location = new google.maps.LatLng(e.latLng.lat() , e.latLng.lng());
            var marker = new google.maps.Marker({
              position: location,
              map: map,
              icon: _this.state.newMarkerImage || '',
              animation: google.maps.Animation.DROP,
              // draggable: _this.props.edit
            });
            markers.push({ marker: marker, markerModel: markerModel });
            // console.log('data');
            data.sequence.points.push(markerModel.toJSON());
            window.localStorage.setItem('data', JSON.stringify(data));
            // console.log(data);
            _this.createMarker(marker, point, markerModel);
          }); 
        } else {
          google.maps.event.removeListener(map, 'click');
          google.maps.event.addListener(map, 'click', function() {
            markers.forEach(function(marker){
              marker.marker.setAnimation(null);
              infoWindow.close();
            });
          });
        }
      });
    },
    toggleFullscreen: function (){
      this.setState({fullscreen: !this.state.fullscreen});
    },
    updateMarkers : function(points) {
      var markers = this.state.markers;
      var map = this.state.map;
      var infoWindow = this.state.infoWindow;
      var _this = this;
      // map may not be loaded when parent component re-renders
      if(map === null) { return false; }
      // remove everything
      markers.forEach( function(marker) {
        marker.marker.setMap(null);
      } );
      this.state.markers = [];
      // add new markers
      points.forEach((function( point ) {
        var location = new google.maps.LatLng( point.latitude , point.longitude );
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: point.title,
          icon: point.icon || '',
          draggable: _this.props.edit
        });
        if(!point.markerModel){
          markerModel = new MarkerModel({id: point.id, 
                                         title: point.title, 
                                         infoWindow: point.infoWindow});
        }
        // console.log(markerModel);
        markers.push({ marker: marker, markerModel: point.markerModel });
        _this.createMarker(marker, point, markerModel)
      }));
      google.maps.event.addListener(map, 'click', function() {
        markers.forEach(function(marker){
          marker.marker.setAnimation(null);
          infoWindow.close();
        });
      });
      this.setState( { markers : markers });

    },
    informationWindow: function(){
      return "Inforamtion Window Map Component Function";
    },
    changeMapType: function(type){
      var map = this.state.map;
      if($.inArray(type, ["ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"]) > -1) {
        map.setMapTypeId(google.maps.MapTypeId[type]);
      } else {
        console.warning('invalid type');
      }
    },
    setCenter: function(obj) {
      // console.log(obj);
      var map = this.state.map;
      map.setCenter(new google.maps.LatLng( obj.lat , obj.lng ));
    },
    addControls : function(controlsId){
      map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push($(controlsId)[0]);
    },
    render : function() {
      return (
        <div id={this.props.id} className={(this.state.fullscreen)?'map-canvas_fullscreen':''}></div>
      );
    }

  });

return Map;
});


