// FIRST TIME ONLY- run:
//   ./node_modules/.bin/webdriver-manager update
//
//   Try: `npm run webdriver:update`
//
// AND THEN EVERYTIME ...
//   1. Compile with `tsc`
//   2. Make sure the test server (e.g., http-server: localhost:8080) is running.
//   3. ./node_modules/.bin/protractor protractor.config.js
//
//   To do all steps, try:  `npm run e2e`

var fs = require('fs');
require('babel-register');

var saveDocumentScreenshot = require('../../src/commands/saveDocumentScreenshot').default;
var saveElementScreenshot = require('../../src/commands/saveElementScreenshot').default;
var saveViewportScreenshot = require('../../src/commands/saveViewportScreenshot').default;

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'mocha',

  // Spec patterns are relative to this config file
  specs: ['**/*.test.js'],

  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://tests:8080',

  onPrepare: function() {
    // Allow changing bootstrap mode to NG1 for upgrade tests
    global.setProtractorToNg1Mode = function() {
      browser.useAllAngular2AppRoots = false;
      browser.rootEl = 'body';
    };

    // Add wdio-screenshot methods to the browser object (super hacky)
    browser.saveDocumentScreenshot = saveDocumentScreenshot;
    browser.saveElementScreenshot = saveElementScreenshot;
    browser.saveViewportScreenshot = saveViewportScreenshot;
  },

  mochaOpts: {
    reporter: "spec",
    timeout: 60000,
  },
};
