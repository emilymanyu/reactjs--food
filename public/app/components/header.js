var React = require("react");
var Link = require('react-router').Link;

var Header = React.createClass({
  render : function() {
    return (
      <div className="navbar navbar-fixed-top navbar-inverse" >
            <div className="container">
              <Link to="/" id="logo" >Food Introduction</Link>
              <nav>
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/welcome">Home</Link></li>
                    <li><Link to="/food">Foods</Link></li>
                    <li><Link to="/foodnews">FoodNews</Link></li>
                    <li><Link to="/foodShopList">Food Shop List</Link></li>
                    <li className="dropdown">
                      <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                        Account <b className="caret"></b>
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to="/food">Profile</Link></li>
                        <li><Link to="/foodShopList">Settings</Link></li>
                        <li className="divider"></li>
                        <li>
                           <Link to="/about">About</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
              </nav>
            </div>
          </div>
      );
  }
  });

 module.exports = Header; 