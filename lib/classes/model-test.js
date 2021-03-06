/**
 * tequila
 * model-test
 */

test.runnerModel = function (SurrogateModelClass, inheritanceTest) {
  var inheritanceTestWas = T.inheritanceTest;
  T.inheritanceTest = inheritanceTest;
  test.heading('Model Class', function () {
    test.paragraph('Models being the primary purpose of this library are extensions of javascript objects.  ' +
      'The tequila class library provides this class to encapsulate and enforce consistent programming interface' +
      'to the models created by this library.');
    test.heading('CONSTRUCTOR', function () {
      test.paragraph('Creation of all Models must adhere to following examples:');
      test.example('objects created should be an instance of Model', true, function () {
        return new SurrogateModelClass() instanceof Model;
      });
      test.example('should make sure new operator used', Error('new operator required'), function () {
        SurrogateModelClass();
      });
      test.example('should make sure properties are valid', Error('error creating Model: invalid property: sup'), function () {
        new SurrogateModelClass({sup: 'yo'});
      });
      test.example('can supply attributes in constructor in addition to ID default', 'scrabble', function () {
        var play = new SurrogateModelClass({attributes: [new Attribute('game')]});
        play.set('game', 'scrabble'); // this would throw error if attribute did not exist
        return play.get('game');
      });
    });
    test.heading('PROPERTIES', function () {
      test.heading('tags', function () {
        test.paragraph('Tags are an array of strings that can be used in searching.');
        test.example('should be an array or undefined', undefined, function () {
          var m = new SurrogateModelClass(); // default is undefined
          test.assertion(m.tag === undefined && m.getObjectStateErrors().length == 0);
          m.tags = [];
          test.assertion(m.getObjectStateErrors().length == 0);
          m.tags = 'your it';
          test.assertion(m.getObjectStateErrors().length == 1);
        });
      });
      test.heading('attributes', function () {
        test.paragraph('The attributes property is an array of Attributes.');
        test.example('should be an array', true, function () {
          var goodModel = new SurrogateModelClass(), badModel = new SurrogateModelClass();
          badModel.attributes = 'wtf';
          return (goodModel.getObjectStateErrors().length == 0 && badModel.getObjectStateErrors().length == 1);
        });
        test.example('elements of array must be instance of Attribute', undefined, function () {
          // passing true to getObjectStateErrors() means only check model and not subclass validations
          // todo make unit test for above
          var model = new SurrogateModelClass();
          model.attributes = [new Attribute("ID", "ID")];
          test.assertion(model.getObjectStateErrors(true).length == 0);
          model.attributes = [new Attribute("ID", "ID"), new SurrogateModelClass(), 0, 'a', {}, [], null];
          test.assertion(model.getObjectStateErrors(true).length == 6);
        });
      });
      test.heading('value', function () {
      });
    });
    test.heading('METHODS', function () {
      test.heading('toString()', function () {
        test.example('should return a description of the model', true, function () {
          return new SurrogateModelClass().toString().length > 0;
        });
      });
      test.heading('copy(sourceModel)', function () {
        test.example('copy all attribute values of a model', undefined, function () {
          var Foo = function (args) {
            Model.call(this, args);
            this.modelType = "Foo";
            this.attributes.push(new Attribute('name'));
          };
          Foo.prototype = T.inheritPrototype(Model.prototype);
          var m1 = new Foo();
          var m2 = new Foo();
          var m3 = m1;
          m1.set('name', 'Bar');
          m2.set('name', 'Bar');
          // First demonstrate instance ref versus another model with equal attributes
          test.assertion(m1 === m3); // assigning one model to variable references same instance
          test.assertion(m3.get('name') === 'Bar'); // m3 changed when m1 changed
          test.assertion(m1 !== m2); // 2 models are not the same instance
          test.assertion(JSON.stringify(m1) === JSON.stringify(m2)); // but they are identical
          // clone m1 into m4 and demonstrate that contents equal but not same ref to object
          var m4 = new Foo();
          m4.copy(m1);
          test.assertion(m1 !== m4); // 2 models are not the same instance
          test.assertion(JSON.stringify(m1) === JSON.stringify(m4)); // but they are identical
        });
      });
      test.heading('getObjectStateErrors()', function () {
        test.example('should return array of validation errors', undefined, function () {
          test.assertion(new SurrogateModelClass().getObjectStateErrors() instanceof Array);
        });
        test.example('first attribute must be an ID field', 'first attribute must be ID', function () {
          var m = new SurrogateModelClass();
          m.attributes = [new Attribute('spoon')];
          return m.getObjectStateErrors();
        });
      });
      test.heading('onEvent', function () {
        test.paragraph('Use onEvent(events,callback)');
        test.example('first parameter is a string or array of event subscriptions', Error('subscription string or array required'), function () {
          new SurrogateModelClass().onEvent();
        });
        test.example('callback is required', Error('callback is required'), function () {
          new SurrogateModelClass().onEvent([]);
        });
        test.example('events are checked against known types', Error('Unknown command event: onDrunk'), function () {
          new SurrogateModelClass().onEvent(['onDrunk'], function () {
          });
        });
        test.example('here is a working version', undefined, function () {
          test.show(T.getAttributeEvents());
          // Validate - callback when attribute needs to be validated
          // StateChange -- callback when state of object (value or validation state) has changed
          new Model().onEvent(['Validate'], function () {
          });
        });
      });
      test.heading('get(attributeName)', function () {
        test.example('returns undefined if the attribute does not exist', undefined, function () {
          test.assertion(new SurrogateModelClass().get('whatever') === undefined)
        });
        test.example("returns the value for given attribute", 42, function () {
          var question = new SurrogateModelClass({attributes: [new Attribute('answer', 'Number')]});
          question.attributes[1].value = 42;
          return question.get('answer');
        });
      });
      test.heading('getAttributeType(attributeName)', function () {
        test.example('returns attribute type for given attribute name', 'Date', function () {
          return new Model({attributes: [new Attribute('born', 'Date')]}).getAttributeType('born');
        });
      });
      test.heading('set(attributeName,value)', function () {
        test.example('throws an error if the attribute does not exists', Error('attribute not valid for model'), function () {
          new SurrogateModelClass().set('whatever');
        });
        test.example("sets the value for given attribute", 42, function () {
          var question = new SurrogateModelClass({attributes: [new Attribute('answer', 'Number')]});
          question.set('answer', 42);
          return question.attributes[1].value;
        });
      });
      test.heading('validate', function () {
        test.paragraph('check valid object state and value for attribute - invoke callback for results');
        test.example('callback is required', Error('callback is required'), function () {
          new Model().validate();
        });
      });

      test.heading('setError', function () {
        test.paragraph('Set a error condition and descriptive message');
        test.example('first argument condition required', Error('condition required'), function () {
          new Model().setError();
        });
        test.example('second argument description required', Error('description required'), function () {
          new Model().setError('login');
        });
      });
      test.heading('clearError', function () {
        test.paragraph('Clear a error condition');
        test.example('first argument condition required', Error('condition required'), function () {
          new Model().clearError();
        });
      });

    });
    test.heading('INTEGRATION', function () {
      test.example('model validation usage demonstrated', test.asyncResponse('test4: 0'), function (testNode, returnResponse) {

        // Create a model with each attribute having and error
        var model = new Model({attributes: [
          new Attribute({name: 'Name', validationRule: {required: true}}),
          new Attribute({name: 'Age', type: 'Number', validationRule: {range: [18, null]}}),
          new Attribute({name: 'Sex', validationRule: {required: true}})
        ]});

        model.setError('danger','Danger Will Robinson');

        // Create a model validation where males have to be 21
        model.onEvent('Validate', function () {
          var name = model.get('name');
          var age = model.get('age');
          var sex = model.get('sex');
          if (sex != 'F' && age < 21)
            model.validationErrors.push('Males must be 21 or over');
        });
        model.validate(test1);

        // Expect 1 error from B9 Robot (Attribute errors ignored if model state error)
        function test1() {
          if (model.validationErrors.length == 1) {
            model.clearError('danger');
            model.validate(test2);
          } else {
            returnResponse(testNode, 'test1: ' + model.validationErrors.length);
          }
        }

        // Expect 3 errors for each attribute
        function test2() {
          if (model.validationErrors.length == 3) {
            model.set('name', 'John Doe');
            model.set('age', 18);
            model.set('sex', 'M');
            model.validate(test3);
          } else {
            returnResponse(testNode, 'test2: ' + model.validationErrors.length);
          }
        }

        // Expect 1 errors since all attributes fixed but model will fail
        function test3() {
          if (model.validationErrors.length == 1 && model.validationMessage == 'Males must be 21 or over') {
            model.set('age', 21);
            model.validate(test4);
          } else {
            returnResponse(testNode, 'test3: ' + model.validationErrors.length);
          }
        }

        // Test done should be no errors (to pass final test)
        function test4() {
          returnResponse(testNode, 'test4: ' + model.validationErrors.length);
        }
      });
    });
  });
  T.inheritanceTest = inheritanceTestWas;
};
