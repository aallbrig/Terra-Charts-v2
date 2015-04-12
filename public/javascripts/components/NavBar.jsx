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
      NavItems = [{
        href : 'home',
        text : 'Home'
      }],
      NavItemsRight = [];
      MenuItems = [{
        text : 'Create'
      }, {
        text : 'Present'
      }];

  return React.createClass({
    NavItems : function(){
      return NavItems.map(function(item, index){
        return (<NavItem eventKey={index} href={item.href}>{item.text}</NavItem>);
      });
    },
    MenuItems : function(){
      return MenuItems.map(function(item, index){
        return (<MenuItem eventKey={index}>{item.text}</MenuItem>);
      });
    },
    NavItemsRight: function(){
      return NavItemsRight.map(function(item, index){
        return (<NavItem eventKey={index} href={item.href}>{item.text}</NavItem>);
      });
    },
    render: function(){
      return (
        <Grid fluid={true} id='nav-bar_fluid-container'>
          <Grid id='nav-bar_container'>
            <Row>
              <Col xs={12}>
                <Navbar brand="Terra Charts" toggleNavKey={0}>
                  <CollapsableNav eventKey={0}>
                    <Nav navbar>
                      {this.NavItems()}
                      <DropdownButton eventKey={3} title='Chart Actions'>
                        {this.MenuItems()}
                      </DropdownButton>
                    </Nav>
                    <Nav navbar right>
                      {this.NavItemsRight()}
                    </Nav>
                  </CollapsableNav>
                </Navbar>
              </Col>
            </Row>
          </Grid>
        </Grid>
      );
    }
  })
})