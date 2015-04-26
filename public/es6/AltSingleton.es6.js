define(function (require) {
  'use strict';
  var AltLibrary = require('alt');
  
  var AltSingleton = new AltLibrary();

  // return singleton
  return AltSingleton; 
});

