/**
 * tequila
 * application-model
 */

// Model Constructor
var Application = function (args) {
  if (false === (this instanceof Application)) throw new Error('new operator required');
  args = args || {};
  if (!args.attributes) {
    args.attributes = [];
  }
  args.attributes.push(new Attribute({name: 'name', type: 'String(20)'}));
  args.attributes.push(new Attribute({name: 'brand', type: 'String'}));
  Model.call(this, args);
  this.modelType = "Application";
  this.set('name','newApp');
  this.set('brand','NEW APP');
};
Application.prototype = T.inheritPrototype(Model.prototype);
/*
 * Methods
 */
Application.prototype.start = function (callBack) {
  if (false === (this.primaryInterface instanceof Interface)) throw new Error('error starting application: interface not set');
  if (false === (this.appPresentation instanceof Presentation)) throw new Error('error starting application: appPresentation not set');
  if (false === (this.toolbarPresentation instanceof Presentation)) throw new Error('error starting application: toolbarPresentation not set');
  if (typeof callBack != 'function') throw new Error('callBack required');
  var self = this;
  this.startCallback = callBack;
  this.primaryInterface.start(self, this.appPresentation, this.toolbarPresentation, function (request) {
    if (request.type=='Command') {
      request.command.execute();
    } else {
      if (self.startCallback) {
        self.startCallback(request);
      }
    }
  });
};
Application.prototype.dispatch = function (request, response) {
  if (false === (request instanceof Request)) throw new Error('Request required');
  if (response && typeof response != 'function') throw new Error('response callback is not a function');
  if (this.startCallback) {
    this.startCallback(request);
    return true;
  }
  return false;
};
Application.prototype.setInterface = function (primaryInterface) {
  if (false === (primaryInterface instanceof Interface)) throw new Error('instance of Interface a required parameter');
  this.primaryInterface = primaryInterface;
};
Application.prototype.getInterface = function () {
  return this.primaryInterface;
};
Application.prototype.setAppPresentation = function (appPresentation) {
  if (false === (appPresentation instanceof Presentation)) throw new Error('instance of Presentation a required parameter');
  this.appPresentation = appPresentation;
  if (this.startCallback) {
    // Interface started so reload
    this.primaryInterface.setAppPresentation(this.appPresentation);
  }
};
Application.prototype.getAppPresentation = function () {
  return this.appPresentation;
};
Application.prototype.setToolbarPresentation = function (toolbarPresentation) {
  if (false === (toolbarPresentation instanceof Presentation)) throw new Error('instance of Presentation a required parameter');
  this.toolbarPresentation = toolbarPresentation;
  if (this.startCallback) {
    // Interface started so reload
    this.primaryInterface.setToolbarPresentation(this.toolbarPresentation);
  }
};
Application.prototype.getToolbarPresentation = function () {
  return this.toolbarPresentation;
};
