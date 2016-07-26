var ReactDOM = require('react-dom')
var React = require('react')
var foods = require('./data/data').allFoods
var _ = require('lodash');
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute 

var SelectBox = React.createClass({
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
            this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
      render: function(){
           return (
                <div className="col-md-10">
               <input type="text" placeholder="Search" 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
                 Sort by:
                  <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                     <option value="name">Alphabetical</option>
                     <option value="age">Newest</option>
                 </select>
             </div>
               );
          }
       });

var FoodItem= React.createClass({
      render: function(){
          return (
             <li className="thumbnail food-listing">
            <Link to={'/foods/'+this.props.foods.id} className="thumb">
              <img src={this.props.foods.imageUrl}/> </Link>
            <Link to={'/foods/'+this.props.foods.id}>{this.props.foods.name}</Link>
                 <p>{this.props.foods.snippet}</p>
             </li> 
            ) ;
      }
  });

var FilteredFoodList = React.createClass({
    render: function(){
        var displayedFoods = this.props.foods.map(function(food) {
            return <FoodItem key={food.id} foods={food} /> ;
        }) ;
        return (
                <div className="col-md-10">
                  <ul className="foods">
                      {displayedFoods}
                  </ul>
                </div>
            ) ;
    }
});

var FoodCatalogueApp = React.createClass({
  getInitialState: function() {
       return { search: '', sort: 'name' } ;
  },
  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
  }, 
  render: function(){
       var list = foods.filter(function(p) {
              return p.name.toLowerCase().search(this.state.search.toLowerCase() ) != -1 ;
            }.bind(this) );
      var filteredList = _.sortBy(list, this.state.sort) ;
       return (
            <div className="view-container">
              <div id = "foodpage">
                          <br />
                          <h1>Food</h1>
                          <br />
                          <br />
                        </div>
            <div className="view-frame">
               <div className="container-fluid">
               <div className="row">
                  <SelectBox onUserInput={this.handleChange } 
                         filterText={this.state.search} 
                         sort={this.state.sort} />
                   <FilteredFoodList foods={filteredList} />
              </div> 
              </div>                   
            </div>
          </div>
      );
  }
});


exports.FoodCatalogueApp = FoodCatalogueApp ;