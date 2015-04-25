/** @jsx React.DOM */

var SearchButton = React.createClass({
  render : function() {
    return (
      <div className="btn">
        <i className="fa fa-search fa-2x"></i>
        <span className="hidden-xs"> Search</span>
      </div>
    );
  }
});
