var _ = require('lodash');

    var foodShopLists = [
                    {
                        "name": "Fruits Shop",
                        "address": "123 Test St",
                        "phone_number": "132-3212"
                    },

                    {
                        "name": "Snakes Shop",
                        "address": "23 Main St",
                        "phone_number": "934-4329"
                    },

                    {
                        "name": "Pizza Shop",
                        "address": "4 Lower St",
                        "phone_number": "432-5832"
                    },

                    {
                        "name": "Cake Shop",
                        "address": "49 Upper Street",
                        "phone_number": "934-4290"
                    }
                  ] ; 

    var stubAPI = {
         delete : function(k) {
                 var elements = _.remove(foodShopLists, 
                     function(foodShopList) {
                           return foodShopList.phone_number == k;
                        }); 
                        },
          getAll : function() {
              return foodShopLists ;
          },
         add : function(n,a,p) {
                 foodShopLists.push({
                     name: n, address : a, phone_number: p }) ;
              },
         update : function(key,n,a,p) {
                   var index = _.findIndex(foodShopLists, function(foodShopList) {
                        return foodShopList.phone_number == key;
                      } );      
                   if (index != -1) {
                      foodShopLists.splice(index, 1, {name: n, address: a, phone_number: p});
                    }
              }
          }
          exports.api = stubAPI ;