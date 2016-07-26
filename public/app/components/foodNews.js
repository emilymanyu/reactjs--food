var ReactDOM = require('react-dom')
    var React = require('react')
    var api =  require ('./stub1API').api;
    var _ = require('lodash');
    
    var ReactDOM = require('react-dom')
var foods = require('./data/data').allFoods
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute 

        var Form = React.createClass({
               getInitialState: function() {
                   return { title: '', link: ''};
                },
                addTitle: function(e) {
                    this.setState({title: e.target.value});
                },
                addLink: function(e) {
                    this.setState({link: e.target.value});
                },
                addRecord: function(e){
                    e.preventDefault();
                    var title = this.state.title.trim();
                    var link = this.state.link.trim();
                    if (!title) {
                            return;
                    }
                    this.props.addPostHandler(title,link);
                    this.setState({title: "",link: ""});
                },
                render : function() {
                     return (
                       <form style={{marginTop: '30px'}}>
                          <h3>Add a new post</h3>
                          <div className="form-group">
                            <input type="text"
                              className="form-control" placeholder="Title"
                              value={this.state.title} onChange={this.addTitle} ></input>
                          </div>
                          <div className="form-group">
                            <input type="text"
                               className="form-control" placeholder="Link"
                               value={this.state.link} onChange={this.addLink} ></input>
                          </div>
                          <button type="submit" className="btn btn-primary" onClick={this.addRecord} >Post</button>
                        </form>
                      );
                  }
           });

        var NewsItem = React.createClass({
                handleVote : function() {
                     this.props.upvoteHandler(this.props.post.id);
                },
                render : function() {
                    var lineStyle = {
                         fontSize: '20px', marginLeft: '10px'  };
                    var line ;
                    if (this.props.post.link ) {
                       line = <a href={this.props.post.link} >
                                    {this.props.post.title} </a> ;
                    } else {
                       line = <span>{this.props.post.title} </span> ;
                    }
                  return (
                        <div >
                          <span className="glyphicon glyphicon-thumbs-up" 
                              onClick={this.handleVote} ></span>
                          {this.props.post.upvotes}
                          <span style={lineStyle} >{line}<span>
                          <a href= {'#/posts/'+ this.props.post.id}>Comments</a>
                            </span>
                          </span>
                        </div>  
                );
                }
           }) ;

           var NewsList = React.createClass({
                render : function() {
                  var items = this.props.posts.map(function(post,index) {
                         return <NewsItem key={index} post={post} 
                                  upvoteHandler={this.props.upvoteHandler}  /> ;
                     }.bind(this) )
                  return (
                    <div>
                          {items}
                          </div>
                    );
                }
           }) ;  

          var FoodNews = React.createClass({ 
              incrementUpvote : function(id) {
                   api.upvote(id) ;
                   this.setState({});
              }, 
              addPost : function(title,link){
                   api.add(title,link) ;
                   this.setState({});
              },   
              render: function(){
                  var posts = _.sortBy(api.getAll(), function(post) {
                          return - post.upvotes;
                       }
                    );
                  return (
                    <div>                    
                        <div id = "foodnews">
                          <br />
                          <h1>Food News</h1>
                          <br />
                          <br />
                        </div>
                        <div className="row">
                           <div className="col-md-6 col-md-offset-3">
                           <NewsList posts={posts} 
                                upvoteHandler={this.incrementUpvote} />
                           <Form  addPostHandler={this.addPost}/>
                           </div>
                        </div>
                    </div>
                  );
              }
          });

exports.FoodNews = FoodNews;