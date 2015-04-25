/** @jsx React.DOM */

define(function (require) {
  var React = require('react');

  var TrashButton = React.createClass({
    handleClick: function (e){
      // TODO: Get more creative than this
      localStorage.removeItem("data");
      localStorage.removeItem("mapType");
      localStorage.removeItem('latitude');
      localStorage.removeItem('longitude');
      location.reload();
    },
    render : function() {
      return (
        <div className="btn hide-on-landscape" onClick={this.handleClick}>
          <i className="fa fa-trash fa-2x"></i>
          <span className="hidden-xs"> Trash</span>
        </div>
      );
    }
  });

  return TrashButton;
});

