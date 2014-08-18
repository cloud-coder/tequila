# tequila [![Build Status](https://secure.travis-ci.org/dremoor/tequila.png)](http://travis-ci.org/dremoor/tequila)[![Coverage Status](https://img.shields.io/coveralls/dremoor/tequila.svg)](https://coveralls.io/r/dremoor/tequila?branch=master)
Tequila is a javascript application framework.  It runs on node server and html5 capable interfaces.

## Project Goals:
* Provide high level abstractions to simplify application development
* Facilitate design pattern practices
* Adherence to test driven design and development
* Utilize 3rd party libraries but provide facades and adapters to keep the app simple, flexible and extensible

####Sample app
- bootstrap:  http://dremoor.github.io/tequila/samples/bootstrap3-panels-interface-sample/
- framework7: http://dremoor.github.io/tequila/samples/framework7-interface-sample

####Specs, Docs, & Tests 
http://dremoor.github.io/tequila/test-spec/test-runner

## Install
- git it
- npm install it
- make it (grunt)

#### To do now

#### To do later
- make abstraction for toolbar vs app then have interface render toolbar accordingly
- set up automated client / server tests automated with node.js + phantom.js
- rewrite test fixture using library / interface
- Finish Login in interface sample can use the attribute exception handling now
- new methods for Models:
    - getModelName() - Primary description for model example
    - getModelType() - optional small identifying info
    - getModelPrimaryInfo() - summary info for model
    - getModelSecondaryInfo() - additional details for model
- Workspace Integration
- add get and put methods to Model
- Review callback for consistency.  err, xxx like node?
- tequilaStore needs to be set not hard coded (mongo)
- Improve Session to handle server side auth on store
- Add authentication to Store via sessions
- Attribute visible property
- Attribute image type
- Incorporate onEvent and _emitEvent as mixins to Attribute and Model (so far)

#### To do even later
- Why is Travis breaking JSONfilestore ?
- Fix test rig async assertions getting intermixed need state per node instead of global
- figure out wtf above means
- create redis-store
- create package-store (sound, image, pdf, misc subclass resource-class make attribute type)
- Use confess / phantomJS to make cache manifest

#### Uncertain
- make remote command type or flag as remote ? or just do it automatically if not handled locally ?
- Make easier way to retrieve single model findModel()
- Command class functions should not need to call this.complete() ... should be automatic?
- Don't store nulls in stores just do by inference (have get populate on return and put remove before inserting)
- include google toolchain for chrome apps and bundles (cell,osx,...)
