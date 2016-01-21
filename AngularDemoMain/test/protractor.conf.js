exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'e2e/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  // configure to whatever address app is being served at.
  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',
    directConnect: true,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
