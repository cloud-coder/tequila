/**
 * tequila
 * tequila-class.js
 */
var Tequila = (function () {
  var singletonInstance;
  function init() {
    // Private methods and variables
    var version = '0.0.1';
//    function privateMethod() {
//      console.log("I am private");
//    }
//    var privateVariable = "Im also private";
    var attributeTypes = ['ID', 'String', 'Date', 'Boolean', 'Number', 'Model', 'Group', 'Table'];
    return    {
      // Public methods and variables
      getVersion: function () {
        return version;
      },
      contains: function (a, obj) {
        for (var i = 0; i < a.length; i++) {
          if (a[i] === obj) return true;
        }
        return false;
      },
      getUnusedProperties: function (properties, allowedProperties) {
        var props = [];
        for (var property in properties) {
          if (!this.contains(allowedProperties, property)) {
            props.push(property);
          }
        }
        return props;
      },
      inheritPrototype: function(p) {
        if (p == null) throw TypeError();
        if (Object.create) return Object.create(p);
        var t = typeof p;
        if (t !== "object" && typeof t !== "function") throw TypeError();
        function f() {};
        f.prototype = p;
        return new f();
      },
      getAttributeTypes: function() {
        return attributeTypes;
      }
    };
  };
  return function () {
    if (!singletonInstance) singletonInstance = init();
    return singletonInstance;
  };
})();
// Library scoped ref to singleton
var T = Tequila();