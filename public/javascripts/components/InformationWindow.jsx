/** @jsx React.DOM */

var InformationWindow = React.createClass({
  getDefaultProps: function() {
    return {
        onRequestHide: function(){
          console.log('No on request hide sent in view props');
        },
        localStorage: {}
    }
  },
  getInitialState: function () {
    return {
      isModalOpen: true
    };
  },
  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    this.props.onRequestHide();
  },
  render : function() {
    var isModalOpen = this.state.isModalOpen;
    return (
      <span>
      {(isModalOpen === true)?
          <Modal className="information-window_modal" title="First Time?" animation={true} closeButton={true} onRequestHide={this.handleToggle}>
            <div className="information-window_modal_body">
              <Row>
                <Col xs={12}>
                  <h4> Controls </h4>
                  <div className="information-window_modal_body_table">
                    <Row>
                      <Col sm={1}>
                        <i className="fa fa-map-marker fa-2x"></i>
                      </Col>
                      <Col sm={4}>
                        Add custom marker to map.
                      </Col>
                      <Col sm={1}>
                        <i className="fa fa-globe fa-2x"></i>
                      </Col>
                      <Col sm={4}>
                        Map Settings - Modify viewport options (e.g. terrain or satellite imagery).
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                      <Col sm={1}>
                        <i className="fa fa-dot-circle-o fa-2x"></i>
                      </Col>
                      <Col sm={4}>
                        Change view to your location.
                      </Col>
                      <Col sm={1}>
                        <i className="fa fa-trash fa-2x"></i>
                      </Col>
                      <Col sm={4}>
                        Throw away modifications and start fresh.
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal>
        : ''}
      </span>
    );
  }
});
