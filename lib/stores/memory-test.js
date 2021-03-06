/**
 * tequila
 * memory-test
 */
test.runnerMemoryStore = function () {
  test.heading('MemoryStore', function () {
    test.paragraph('The MemoryStore is a simple volatile store. ' +
      'It is the first test standard to define the spec for all Stores to follow.');
    test.heading('CONSTRUCTOR', function () {
      test.heading('Store Constructor tests are applied', function () {
        test.runnerStoreConstructor(MemoryStore,true);
      });
      test.example('objects created should be an instance of MemoryStore', true, function () {
        return new MemoryStore() instanceof MemoryStore;
      });
    });
    test.heading('Store tests are applied', function () {
      test.runnerStoreMethods(MemoryStore,false);
    });
  });
};
