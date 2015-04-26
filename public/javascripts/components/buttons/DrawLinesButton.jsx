/** @jsx React.DOM */

define(function (require) {
  var React = require('react');
  var google = require('gmaps');
  var ChartActions = require('actions/ChartActions');
  var MapStore = require('stores/MapStore');
  var google = require('gmaps');


  var DrawLinesButton = React.createClass({
    render: function () {
      return (
        <div className="btn" onClick={ChartActions.addDrawLinesListener}>
          <i className="fa fa-paint-brush fa-2x"></i>
          <span className="hidden-xs"> Draw Lines</span>
        </div>
      );
    }
  });

  return DrawLinesButton;
});

