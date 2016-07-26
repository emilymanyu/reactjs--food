var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute
var ReactDOM = require('react-dom')
var React = require('react')
var foods = require('./components/data/data').alFoods ;
var _ = require('lodash'); 
var FoodCatalogueApp = require('./components/foodpage.js' ).FoodCatalogueApp ;
var Header = require('./components/header');
var Footer = require('./components/footer');
var FoodDetail = require('./components/foodDetail.js' ).FoodDetail ;
var CommentView = require('./components/commentPage.js').CommentView;

var FoodShopList = require('./components/foodShopList.js').FoodShopListsApp ;
var FoodNews = require('./components/foodNews.js').FoodNews ;

var About = React.createClass({  

  render: function() {
    return (
      <div id ="about">
      <br />
        <h1>About page</h1>
        <br />
      </div>
    );
  } 
  }) ;


var Welcome = React.createClass({
  render : function() {
    return (
      <div id ="homepage">
             
        <br />
        <h1>The delicious food</h1>
        <br />
        <br />
        <br />
      </div>
    )
  }
});


var App = React.createClass({
  render : function() {
    return (
      <div>
        <Header />
        <div>
        {this.props.children}
      </div>
      <Footer />
      </div>
    )
  }
});

ReactDOM.render((
  <Router >
    <Route path="/" component={App}> 
      <IndexRoute component={Welcome}/>  
      <Route path="about" component={About} />
      <Route path="welcome"component={Welcome}/>
      <Route path="food"component={FoodCatalogueApp}/>  
      <Route path="foods/:id" component={FoodDetail} />
      <Route path="posts/:postId" component={CommentView} />
      <Route path="foodShopList" component={FoodShopList} />
      <Route path="foodnews"  component={FoodNews} />
    </Route>
    
  </Router>
), document.getElementById('mount-point')) ;

