/**
 * tequila
 * mongo-MongoStore-model.js
 */

// Constructor
var MongoStore = function (args) {
  if (false === (this instanceof MongoStore)) throw new Error('new operator required');
  args = args || [];
  this.storeType = args.storeType || "MongoStore";
  this.name = args.name || 'a ' + this.storeType;
  this.storeInterface = {
    isReady: false,
    canGetModel: false,
    canPutModel: false,
    canDeleteModel: false
  };
  var unusedProperties = T.getUnusedProperties(args, ['name', 'storeType']);
  var badJooJoo = [];
  for (var i = 0; i < unusedProperties.length; i++) badJooJoo.push('invalid property: ' + unusedProperties[i]);
  if (badJooJoo.length > 1) throw new Error('error creating Store: multiple errors');
  if (badJooJoo.length) throw new Error('error creating Store: ' + badJooJoo[0]);
};
MongoStore.prototype = T.inheritPrototype(Store.prototype);
// Methods

// See mongo-store-model-server... stub for client here

//MongoStore.prototype.onConnect = function (location, callBack) {
//  if (typeof location != 'string') throw new Error('argument must a url string');
//  if (typeof callBack != 'function') throw new Error('argument must a callback');
//  callBack(this, undefined);
//};
//MongoStore.prototype.getModel = function (parm) {
//  throw new Error(this.storeType + ' does not provide getModel');
//};
//MongoStore.prototype.putModel = function (parm) {
//  throw new Error('Store does not provide putModel');
//};
//MongoStore.prototype.deleteModel = function (parm) {
//  throw new Error('Store does not provide deleteModel');
//};