// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../build_artifacts/coverage'),
      reports: ['html', 'json', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 100,
        lines: 100,
        branches: 100,
        functions: 100
      }
    },
    customLaunchers: {
        ChromeNoSandbox: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        },
        ChromeNoSandboxHeadless: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
        }
    },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    junitReporter: {
      outputDir: require('path').join(__dirname, '../build_artifacts/test-results/junit/')
    },
    logLevel: config.LOG_INFO,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    port: 9876,
    reporters: ['kjhtml', 'progress'],
    restartOnFileChange: true,
    singleRun: false
  });
};
