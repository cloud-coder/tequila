/**
 * tequila
 * list-test
 */

test.runnerList = function (SurrogateListClass, inheritanceTest) {
  var inheritanceTestWas = T.inheritanceTest;
  T.inheritanceTest = inheritanceTest;
  test.heading('List Class', function () {
//    test.paragraph('The List Class is a container for Model sets.');
//    test.heading('CONSTRUCTOR', function () {
//      test.paragraph('Creation of all Collections must adhere to following examples:');
//      test.example('objects created should be an instance of List', true, function () {
//        return new SurrogateListClass() instanceof List;
//      });
//      test.example('should make sure new operator used', Error('new operator required'), function () {
//        List();
//      });
//    });
//    test.heading('PROPERTIES', function () {
//      test.heading('type', function () {
//        test.paragraph('The type determines the nature of the collection.  Each type has it\'s own implementation' +
//          ' but all share the interface of the class.  Methods that are not allowed for a given type will throw an' +
//          ' exception.');
//        test.heading('map', function () {
//          test.paragraph('Associative array, no duplicate IDs, single Model.');
//        });
//        test.heading('list', function () {
//          test.paragraph('List of Models of same type with order in list preserved.');
//        });
//        test.heading('filter', function () {
//          test.paragraph('Calculated collection of Models of same type based filter and order properties.');
//        });
//        test.heading('repository', function () {
//          test.paragraph('Repository of Collections.  Primary usage with StoreInterface.');
//        });
//        test.heading('workspace', function () {
//          test.paragraph('List of Models of any type or other Collections');
//        });
//      });
//      test.heading('modelType', function () {
//      });
//      test.heading('filter', function () {
//      });
//      test.heading('order', function () {
//      });
//    });
//    test.heading('METHODS', function () {
//    });
  });
  T.inheritanceTest = inheritanceTestWas;
};