/** @jsx React.DOM */

var CreateSequence = React.createClass({
  render : function() {
    var hasMap = (this.props.map)?'Has map':'no map';
    return (
      <div>
        Create Sequence Controls <br/>
        Map instance? {hasMap}
      </div>
    );
  }
});