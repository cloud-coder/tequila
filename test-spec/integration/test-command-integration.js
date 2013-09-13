/**
 * tequila
 * test-command-integration
 */
test.runnerCommandIntegration = function () {
  test.heading('Command Integration', function () {
    test.paragraph('test each command type');

    // Stub
    test.example('Stub', Error('command not implemented'), function () {
      var cmd = new Command({
        name: 'stubCommand',
        description: 'stub command test',
        type: 'Stub'
      });
      test.show(cmd);
      cmd.execute();
    });

    // Menu
    test.example('Menu', Error('command not implemented'), function () {
      var cmd = new Command({
        name: 'menuCommand',
        description: 'menu command test',
        type: 'Menu',
        contents: ['Hello World']
      });
      test.show(cmd);
      cmd.execute();
    });

    // Presentation
    test.example('Presentation', Error('command not implemented'), function () {
      var cmd = new Command({
        name: 'presentationCommand',
        description: 'presentation command test',
        type: 'Presentation',
        contents: new Presentation()
      });
      test.show(cmd);
      cmd.execute();
    });

    // Function
    test.example('Function test straight up', test.asyncResponse('Hola! BeforeExecute AfterExecute Adious! funk Completed'), function (testNode, returnResponse) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          this.complete();
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent(['BeforeExecute', 'AfterExecute', 'Error', 'Aborted', 'Completed'], function (event) {
        this.bucket += ' ' + event;
        if (event == 'Completed')
          returnResponse(testNode, this.bucket);
      });
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Function error
    test.example('Function test with error', test.asyncResponse('Hola! BeforeExecute AfterExecute Adious! funk Error Completed'), function (testNode, returnResponse) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          throw new Error('function go boom!');
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent('*', function (event) { // * for all events
        this.bucket += ' ' + event;
        if (event == 'Completed') returnResponse(testNode, this.bucket);
      });
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Function abort
    test.example('Function test with abort', test.asyncResponse('Hola! BeforeExecute AfterExecute Adious! funk Aborted Completed'), function (testNode, returnResponse) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          this.abort();
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent(['BeforeExecute', 'AfterExecute', 'Error', 'Aborted', 'Completed'], function (event) {
        this.bucket += ' ' + event;
        if (event == 'Completed') returnResponse(testNode, this.bucket);
      });
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Procedure
    test.example('Procedure', Error('command not implemented'), function () {
      var cmd = new Command({
        name: 'procedureCommand',
        description: 'procedure command test',
        type: 'Procedure',
        contents: new Procedure()
      });
      test.show(cmd);
      cmd.execute();
    });
  });
};
