
exports.config = {
  directConnect: true,
  chromeDriver: './node_modules/protractor/selenium/chromedriver',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/integration/wacky-spec.js'],

  baseUrl: 'http://localhost:3000'
}
