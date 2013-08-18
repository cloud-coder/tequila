/**
 * tequila
 * test-store-integration
 */
test.runnerStoreIntegration = function () {
  test.heading('Store Integration', function () {
    test.heading('CRUD (Create Read Update Delete)', function () {
      test.example('Exercise all store function for one store.', test.asyncResponse(true), function (testNode, returnResponse) {
        var self = this;
        var storeBeingTested  = test.integrationStore.name + ' ' + test.integrationStore.storeType;
        test.show(storeBeingTested);

        // If store is not ready then get out...
        if (!test.integrationStore.getStoreInterface().isReady) {
          returnResponse(testNode, Error('Store is not ready.'));
          return;
        }

        // setup store and stooge class
        this.store = test.integrationStore;
        this.Stooge = function (args) {
          Model.call(this, args);
          this.modelType = "Stooge";
          this.attributes.push(new Attribute('name'));
        };
        this.Stooge.prototype = T.inheritPrototype(Model.prototype);

        // create initial stooges
        this.moe = new this.Stooge();
        this.moe.set('name', 'Moe');
        this.larry = new this.Stooge();
        this.larry.set('name', 'Larry');
        this.shemp = new this.Stooge();
        this.shemp.set('name', 'Shemp');

        // IDs after stored will be here
        this.stoogeIDsStored = [];
        this.stoogesRetrieved = [];

        // store the stooges
        this.store.putModel(this.moe, stoogeStored, this);
        this.store.putModel(this.larry, stoogeStored, this);
        this.store.putModel(this.shemp, stoogeStored, this);


        // callback after storing stooges
        function stoogeStored(model, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          try {
            self.stoogeIDsStored.push(model.get('id'));
            if (self.stoogeIDsStored.length == 3) {
              test.assertion(true); // Show we made it this far
              // Now that first 3 stooges are stored lets retrieve and verify
              var actors = [];
              for (var i = 0; i < 3; i++) {
                actors.push(new self.Stooge());
                actors[i].set('id', self.stoogeIDsStored[i]);
                self.store.getModel(actors[i], stoogeRetrieved);
              }
            }
          }
          catch (err) {
            returnResponse(testNode, err);
          }
        }

        // callback after retrieving stored stooges
        function stoogeRetrieved(model, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          self.stoogesRetrieved.push(model);
          if (self.stoogesRetrieved.length == 3) {
            test.assertion(true); // Show we made it this far
            // Now we have stored and retrieved (via IDs into new objects).  So verify the stooges made it
            test.assertion(self.stoogesRetrieved[0] !== self.moe && // Make sure not a reference but a copy
              self.stoogesRetrieved[0] !== self.larry && self.stoogesRetrieved[0] !== self.shemp);
            var s = []; // get list of names to see if all stooges made it
            for (var i = 0; i < 3; i++) s.push(self.stoogesRetrieved[i].get('name'));
            test.show(s);
            test.assertion(T.contains(s, 'Moe') && T.contains(s, 'Larry') && T.contains(s, 'Shemp'));
            // Replace Shemp with Curly
            var didPutCurly = false;
            for (i = 0; i < 3; i++) {
              if (self.stoogesRetrieved[i].get('name') == 'Shemp') {
                didPutCurly = true;
                self.stoogesRetrieved[i].set('name', 'Curly');
                self.store.putModel(self.stoogesRetrieved[i], stoogeChanged);
              }
            }
            if (!didPutCurly) {
              returnResponse(testNode, Error("Can't find Shemp!"));
            }
          }
        }

        // callback after storing changed stooge
        function stoogeChanged(model, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          test.assertion(model.get('name') == 'Curly');
          var curly = new self.Stooge();
          curly.set('id', model.get('id'));
          self.store.getModel(curly, storeChangedShempToCurly);
        }

        // callback after retrieving changed stooge
        function storeChangedShempToCurly(model, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          test.assertion(model.get('name') == 'Curly');
          // Now test delete
          self.deletedModelId = model.get('id'); // Remember this
          self.store.deleteModel(model, stoogeDeleted)
        }

        // callback when Curly is deleted
        function stoogeDeleted(model, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          // model parameter is what was deleted
          test.assertion(model.get('id') == null); // ID is removed
          test.assertion(model.get('name') == 'Curly'); // the rest remains
          // Is it really dead?
          var curly = new self.Stooge();
          curly.set('id', self.deletedModelId);
          self.store.getModel(curly, hesDeadJim);
        }

        // callback after lookup of dead stooge
        function hesDeadJim(model, error) {
          if (typeof error != 'undefined') {
            if (error != 'Error: id not found in store') {
              returnResponse(testNode, error);
              return;
            }
          }
//          returnResponse(testNode, true);
          // Now create a list from the stooge store
          var list = new List(new self.Stooge());
          try {
            self.store.getList(list, [], listReady);
          }
          catch (err) {
            returnResponse(testNode, err);
          }
        }

        // callback after list created from store
        function listReady(list, error) {
          if (typeof error != 'undefined') {
            returnResponse(testNode, error);
            return;
          }
          test.assertion(list instanceof List);
          test.assertion(list.length() == 2);
          returnResponse(testNode, true);
        }

      });
    });
  });
};
