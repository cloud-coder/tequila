/**
 * tequila
 * test-store
 */
test.runnerStoreIntegration = function () {
  test.heading('Store Integration', function () {
    test.paragraph('');
    test.heading('CRUD (Create Read Update Delete)', function () {
      test.example('Exercise and verify CRUD functionality.', undefined, function () {

        // setup store and stooge class
        this.store = new MemoryStore();
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
        this.store.putModel(this.moe, stoogeStored, this); // todo unit test this / self
        this.store.putModel(this.larry, stoogeStored, this);
        this.store.putModel(this.shemp, stoogeStored, this);

        // callback after storing stooges
        function stoogeStored(model, error, self) {
          if (typeof error != 'undefined') throw error;
          self.stoogeIDsStored.push(model.get('id'));
          if (self.stoogeIDsStored.length == 3) {
            // Now that first 3 stooges are stored lets retrieve and verify
            var actors = [];
            for (var i = 0; i < 3; i++) {
              actors.push(new self.Stooge());
              actors[i].set('id', self.stoogeIDsStored[i]);
              self.store.getModel(actors[i], stoogeRetrieved, self);
            }
          }
        }

        // callback after retrieving stored stooges
        function stoogeRetrieved(model, error, self) {
          if (typeof error != 'undefined') throw error;
          self.stoogesRetrieved.push(model);
          if (self.stoogesRetrieved.length == 3) {
            // Now we have stored and retrieved (via IDs into new objects).  So verify the stooges made it
            test.assertion(self.stoogesRetrieved[0] !== self.moe && // Make sure not a reference but a copy
              self.stoogesRetrieved[0] !== self.larry && self.stoogesRetrieved[0] !== self.shemp);
            var s = []; // get list of names to see if all stooges made it
            for (var i = 0; i < 3; i++) s.push(self.stoogesRetrieved[i].get('name'));
            test.show(s);
            test.assertion(T.contains(s, 'Moe') && T.contains(s, 'Larry') && T.contains(s, 'Shemp'));
            // Replace Shemp with Curly
            for (var i = 0; i < 3; i++) {
              if (self.stoogesRetrieved[i].get('name') == 'Shemp') {
                self.stoogesRetrieved[i].set('name', 'Curly');
                self.store.putModel(self.stoogesRetrieved[i], stoogeChanged, self);
              }
            }
          }
        }

        // callback after storing changed stooge
        function stoogeChanged(model, error, self) {
          if (typeof error != 'undefined') throw error;
          test.assertion(model.get('name') == 'Curly');
          var curly = new self.Stooge();
          curly.set('id', model.get('id'));
          self.store.getModel(curly, storeChangedShempToCurly, self);
        }

        // callback after retrieving changed stooge
        function storeChangedShempToCurly(model, error, self) {
          if (typeof error != 'undefined') throw error;
          test.assertion(model.get('name') == 'Curly');
          // Now test delete
          self.deletedModelId = model.get('id'); // Remember this
          self.store.deleteModel(model, stoogeDeleted, self)
        }

        // callback when Curly is deleted
        function stoogeDeleted(model, error, self) {
          if (error) throw error;
          // model parameter is what was deleted
          test.assertion(model.get('id') == null); // ID is removed
          test.assertion(model.get('name') == 'Curly'); // the rest remains
          // Is it really dead?
          var curly = new self.Stooge();
          curly.set('id', self.deletedModelId);
          self.store.getModel(curly, hesDeadJim, self);
        }

        // callback after lookup of
        function hesDeadJim(model, error, self) {
          test.assertion(error=='Error: id not found in store');
        }

      });
    });
  });
};