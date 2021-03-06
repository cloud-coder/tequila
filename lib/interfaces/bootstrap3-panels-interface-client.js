/**
 * tequila
 * bootstrap3-panels-interface-client
 */
/*
 * Methods(Client Side Only)
 */

// -------------------------------------------------------------------------------------------------------------------
// start interface
// -------------------------------------------------------------------------------------------------------------------
Bootstrap3PanelInterface.prototype.start = function (application, presentation, toolbarPresentation, callBack) {
  if (!(application instanceof Application)) throw new Error('Application required');
  if (!(presentation instanceof Presentation)) throw new Error('AppPresentation required');
  if (!(toolbarPresentation instanceof Presentation)) throw new Error('toolbarPresentation required');
  if (typeof callBack != 'function') throw new Error('callBack required');
  this.startCallback = callBack;

  // Stuff we care about
  this.panelHandlers = [];
  this.eleCount = 0;
  this.presentation = presentation;
  this.toolbarPresentation = toolbarPresentation;

  // Register Panels
  this.addPanelHandler('home', this.registerAppBar);
  this.addPanelHandler('stub', this.registerStubPanel);
  this.addPanelHandler('presentation', this.registerPresentationPanel);

  // Create html elements for framework
  this.renderFramework();

  // Remover loading panel
  try {
    var loadingPanel = document.getElementById("loadingPanel");
    loadingPanel.parentNode.removeChild(loadingPanel);
  } catch (e) {
  }

  // Change background from white in loader
  document.body.style.backgroundColor = "#e0e0e0";
};

// -------------------------------------------------------------------------------------------------------------------
// setAppPresentation
// -------------------------------------------------------------------------------------------------------------------
Bootstrap3PanelInterface.prototype.setAppPresentation = function (presentation) {
  this.presentation = presentation;
  this.renderNavBarPresentation();
};

// -------------------------------------------------------------------------------------------------------------------
// Dispatch request
// -------------------------------------------------------------------------------------------------------------------
Bootstrap3PanelInterface.prototype.dispatch = function (request, response) {
  var style = null;
  var icon = null;
  var name = null;
  if (false === (request instanceof Request)) throw new Error('Request required');
  if (response && typeof response != 'function') throw new Error('response callback is not a function');
  if (!this.application || !this.application.dispatch(request)) { // todo application not defined ? review design on this interface / app relationship
    if (request.type == 'Command') {
      style = request.command.theme;
      icon = request.command.icon;
      name = request.command.name;

      var doRenderPanel = true;

      // See if panel already
      for (var panel in this.panels) {
        if (this.panels.hasOwnProperty(panel)) {
          if (name == this.panels[panel].label) {
            doRenderPanel = false;
          }
        }
      }

      if (doRenderPanel && request.command.type == 'Stub') {
        this.renderPanel({label: name, type: 'stub', style: style || 'info', icon: icon || 'fa-square-o', request: request});
        return;
      }
      if (doRenderPanel && request.command.type == 'Presentation') {
        if (!(request.command.contents instanceof Presentation)) throw new Error('contents must be a Presentation');
        var errors = request.command.contents.getObjectStateErrors();
        if (errors.length)
          if (errors.length > 1) throw new Error('error executing Presentation: multiple errors');
        if (errors.length) throw new Error('error executing Presentation: ' + errors[0]);
        this.renderPanel({label: name, type: 'presentation', style: style || 'info', icon: icon || 'fa-building', request: request});
        return;
      }
      if (this.startCallback) {
        this.startCallback(request);
      }
    }
  }
};

// -------------------------------------------------------------------------------------------------------------------
// Render Framework
// -------------------------------------------------------------------------------------------------------------------
Bootstrap3PanelInterface.prototype.renderFramework = function () {
  this.renderNavBar();
  this.homePanel();
//  $("#panel1").hide(); // todo dont hard code ?
//  $("#panel1").show();
//  myInterface.renderPageFooter();
//  myInterface.renderPanel({label:'Eat'});
//  myInterface.renderPanel({label:'More'});
//  myInterface.renderPanel({label:'Chiken'});
};
