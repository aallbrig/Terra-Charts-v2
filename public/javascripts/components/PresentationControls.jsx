/** @jsx React.DOM */

var PresentationControls = React.createClass({
  render : function() {
    var hasMap = (this.props.map)?'Has map':'no map';
    console.log(this.props.map.updateMarkers);
    return (
      <div>
        Create Controls
        {hasMap}
      </div>
    );
  }
});