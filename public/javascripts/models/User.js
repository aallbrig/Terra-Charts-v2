define(function(require){
  var Backbone = require('backbone');

  var UserModel = Backbone.Model.extend({
    defaults: function(){
      return {
        commonName : 'default prop',
        img : {
          src : 'http://www.critterbabies.com/wp-content/uploads/2014/02/a1.jpg'
        }
      }
    },
    url: '/user'
  });

  var UserCollection = Backbone.Collection.extend({
    url: '/users',
    model: UserModel
  });

  return {
    Model: UserModel,
    Collection: UserCollection
  };
});

