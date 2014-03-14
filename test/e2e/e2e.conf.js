exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*.scenario.js'],
  // default server for python
  baseUrl: 'http://localhost:8000'
};
