/**
 * tequila
 * app
 */

var app = new Application();
app.set('brand', 'tequila');

var b3p = new Bootstrap3PanelInterface();
app.setInterface(b3p);

// Stub commands
var stubMoe = new Command({name: 'Moe', description: 'Moses Horwitz', theme: 'primary', icon: 'fa-coffee'});
var stubLarry = new Command({name: 'Larry', description: 'Louis Fienberg', theme: 'info', icon: 'fa-beer'});
var stubCurly = new Command({name: 'Curly', description: 'Jerome Lester Horwitz', theme: 'warning', icon: 'fa-glass'});

// Create a function command
var funcCommand = new Command({name: 'Function', type: 'Function', contents: function () {
  alert("Hello! I am an alert box!!");
}});

// Create a procedure command
procCommand = new Command({name: 'Procedure', type: 'Procedure', contents: new Procedure()});

// Create sample presentation
var pres = new Presentation();
pres.set('contents', [
  new Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'}),
  new Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'}),
  new Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)'}),
  funcCommand,
  procCommand,
  stubMoe,
  stubLarry,
  stubCurly

]);
var presCommand = new Command({name: 'Presentation', type: 'Presentation', contents: pres});

// App menu
var menu = new Presentation();
menu.set('name', 'Main Menu');
menu.set('contents', [
  new Command({name: 'Stooges', type: 'Menu', contents: [
    'The Three Stooges',
    '-',
    stubMoe,
    stubLarry,
    stubCurly
  ]}),
  new Command({name: 'Commands', type: 'Menu', contents: [
    'Command Types',
    '-',
    new Command({name: 'Stub', type: 'Stub'}),
    presCommand,
    funcCommand,
    procCommand
  ]})
]);
app.setPresentation(menu);

$(document).ready(function () {
  app.start(function (stuff) {
    console.log('app got stuff: ' + JSON.stringify(stuff));
  });
  b3p.mockRequest(new Request({type: 'Command', command: presCommand}));
});
