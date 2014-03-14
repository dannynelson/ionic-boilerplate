module.exports = function(config) {
  config.set({
    basePath: '../..',

    // sinon-chai includes chai
    frameworks: ['mocha'],

    files: [
      'node_modules/ionic/release/js/ionic.bundle.js',
      'client/**/*.js',
      // Watched files (reload on change, but don't serve)
      {pattern: 'Gruntfile.js', included: false, served: false}
    ],

    reporters: ['dots'],

    preprocessors: {
      '**/client/**/*.js': 'coverage'
    },

    coverageReporter: {
      dir: 'test/client/coverage',
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true
  });
};
