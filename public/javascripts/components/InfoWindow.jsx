/** @jsx React.DOM */

var InfoWindow = React.createClass({
  render : function() {
    return (
      <div className="info-window">
        <div className="info-window_heading">
          <p>{this.props.headingContent || "No_Header"}</p>
        </div>
        <div className="info-window_body" dangerouslySetInnerHTML={{__html: this.props.bodyContent || "No_content"}}>
        </div>
      </div>
    );
  }
});