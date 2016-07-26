var _ = require('lodash');

    var posts = [
             {  id: 1 ,
                title : 'Popular food recipes.',
                link : 'http://www.food.com/',
                username : 'jbloggs',
                comments : [],
                upvotes : 10
              },
             { 
                id: 2,
                title : 'France plans to usurp Scotland as the home of the world best whisky',
                link : 'http://www.independent.co.uk/life-style/food-and-drink/news/whisky-wars-france-plans-to-usurp-scotland-as-the-home-of-the-worlds-best-whisky-a6935916.html',
                username : 'notme',
                comments : [],
                upvotes : 12
              },
              { 
                id: 3,
                title : 'Food and drink-Discover and save creative ideas',
                link : 'https://www.pinterest.com/categories/food_drink/',
                username : 'notme',
                comments : [],
                upvotes : 12
              },
              { 
                id: 4,
                title : 'Eating pulses helps weight loss and lowers cholesterol, new research reveals',
                link : 'http://www.independent.co.uk/life-style/health-and-families/health-news/eating-pulses-helps-weight-loss-and-lowers-cholesterol-new-research-reveals-a6960476.html',
                username : 'psmith',  
                comments : [],
                upvotes : 2
              }
          ] ;


     var stub1API = {
        getAll : function() {
              return posts ;
          },
        add : function(t,n) {
              var id = 1 ;
              var last = _.last(posts) ;
              if (last) {
                 id = last.id + 1 ;
              }
                  console.log( 'Id =  ' + id);
              posts.push({ 'id': id,  
                       title: t, qjt:n, username: '', comments: [], upvotes: 0 }) ;

              },
        upvote : function(id) {
                 var index = _.findIndex(posts, function(post) {
                        return post.id == id;
                      } );      
                   if (index != -1) {                 
                      posts[index].upvotes = posts[index].upvotes + 1 ;
                      }
              },
          
        getPost : function(id) {
               var result = null ;
                 var index = _.findIndex(posts, function(post) {
                        return post.id == id;
                      } );      
                   if (index != -1) {                 
                      result = posts[index];
                      }
              return result ;
              },
        addComment : function(postId,c,n) {
              post = this.getPost(postId ) ;
              var id = 1 ;
              var last = _.last(post.comments) ;
              if (last) {
                 id = last.id + 1 ;
              }
              post.comments.push({ 'id': id,  
                       comment: c , author: n, upvotes: 0 } ) ;

              },
        upvoteComment : function(postId,commentId) {
              post = this.getPost(postId ) ;
              var index = _.findIndex(post.comments, function(c) {
                        return c.id == commentId;
                      } );      
               if (index != -1) {                 
                   post.comments[index].upvotes += 1 ;
                  }
              }
          }
    exports.api = stub1API ;