define(function(require){
  var Backbone = require('backbone');

  var ChartModel = Backbone.Model.extend({
    defaults: function(){
      return {}
    },
    url: 'models/chart'
  });

  var ChartCollection = Backbone.Collection.extend({
    url: 'collections/charts',
    model: ChartModel
  });

  return {
    Model: ChartModel,
    Collection: ChartCollection
  };
});

