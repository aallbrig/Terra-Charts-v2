/** @jsx React.DOM */

var NavMenu = React.createClass({
  getDefaultProps: function(){
    return {
      help: false
    }
  },
  getInitialState: function(){
    return {
      showMenu: false,
      showUserMenu: false
    }
  },
  toggleShowMenu: function(){
    this.setState({showMenu: !this.state.showMenu,
                   showUserMenu: false});
  },
  toggleShowUserMenu: function(){
    this.setState({showMenu: false,
                   showUserMenu: !this.state.showUserMenu});
  },
  getQueryParameter: function(e){
    e.preventDefault();
    console.log('Clicked presentation link!');
  },
  render : function() {
    var showMenu = this.state.showMenu;
    var showUserMenu = this.state.showUserMenu;
    return (
      <div>
        {(showMenu)?
          <div className="menu_menu-items">
            <ListGroup>
              <ListGroupItem>
                <a href="/">Create New Chart</a>
              </ListGroupItem>
              <ListGroupItem>
                <a href="/presentation">Present This Chart</a>
              </ListGroupItem>
            </ListGroup>
          </div> : ''}
        <div className={(showMenu)?'menu menu_navbar_show-menu_state':(showUserMenu)?'menu menu_navbar_show-user-menu_state':'menu'}>
          <div className="col-xs-6">
            <div className="pull-left">
              <Button bsStyle="primary" onClick={this.toggleShowMenu}>
                <i className="fa fa-caret-left"></i> <i className="fa fa-bars"></i><span className="hidden-xs"> Menu</span>
              </Button>
            </div>
            <h3 className="pull-left">Terra Charts!</h3>
          </div>
          <div className="col-xs-6">
            <div className="pull-right">
              {(this.props.help)?<Button bsStyle="primary" onClick={this.props.help}>
                <span className="hidden-xs">Help </span>
                <i className="fa fa-question"></i>
              </Button>:''}
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        {(showUserMenu)?
          <div className="menu_user-info">
            This is the user panel
          </div> : ''}
      </div>
    );
  }
});