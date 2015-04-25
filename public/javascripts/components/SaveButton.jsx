/** @jsx React.DOM */

var SaveButton = React.createClass({
  render : function() {
    return (
      <div className="btn hide-on-landscape">
        <i className="fa fa-save fa-2x"></i>
        <span className="hidden-xs"> Save</span>
      </div>
    );
  }
});
