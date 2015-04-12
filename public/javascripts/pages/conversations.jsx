/** @jsx React.DOM */
define(function(require){
  var React = require('react'),
      ReactBootstrap = require('reactBootstrap'),
      Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Jumbotron = ReactBootstrap.Jumbotron,
      Button = ReactBootstrap.Button,
      NavBar = require('jsx!components/NavBar'),
      StoreTest = require('stores/AnimalStore'),
      AnimalCardGreetings = require('jsx!components/AnimalCardGreetings'),
      AnimalCreateForm = require('jsx!components/Animal/CreateForm');

  window.console.log(StoreTest);

  return React.createClass({
    onClick: function(){
      window.console.log('wow');
    },
    render: function(){
      return (
        <span>
          <NavBar/>
          <Grid>
            <Row>
              <Col xs={12}>
                <Jumbotron className='clearfix'>
                  <Col xs={6}>
                    <h2>Conversations</h2>
                    <p>
                      <Button bsStyle='primary'
                              onClick={this.onClick}> 
                        Wow such cool 
                      </Button>
                    </p>
                  </Col>
                  <Col xs={6}>
                    <AnimalCreateForm/>
                  </Col>
                </Jumbotron>
              </Col>
            </Row>
          </Grid>
          <AnimalCardGreetings/>
        </span>
      );
    }
  });
})