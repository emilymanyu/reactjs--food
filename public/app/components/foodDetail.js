var React = require('react')
var request = require('superagent') ; 
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute 

    var ImagesSection = React.createClass({
          render: function(){
                var thumbImages = this.props.food.images.map(function(img,index) {
                  return (
                          <li>
                           <img key={index} src={img} />
                        </li>
                        ) ;
                    }.bind(this) );
                var mainImage = (
                      <div className="food-images">
                      <img src={this.props.food.images[0]} 
                            className="food" />
                    </div>
                    ) ;
              return (
                  <div>
                       {mainImage}
                       <h1>{this.props.food.name}</h1>
                       <p>{this.props.food.description}</p>
                       <ul className="food-thumbs">
                           {thumbImages}
                       </ul>
                   </div>
                   );
          }
    })

    var FoodDetail = React.createClass({
         getInitialState: function() {
               return { food: null };
           },
         componentDidMount: function() {
            request.get(
                 'app/assets/foods/' + this.props.params.id + '.json', function(err, res) {
                     var json = JSON.parse(res.text);
                    if (this.isMounted()) {
                        this.setState({ food : json});
              }
            }.bind(this));
          } ,
          render: function(){
              var display = <p>No food details</p> ; 
                var food = this.state.food ;
              if (food) {
                  display =  <ImagesSection food={food} /> ;
              }
                return (
                        <div>
                      {display}
                    </div>
                    );
          }
        });

    exports.FoodDetail = FoodDetail ;