const {join} = require('path');

console.log(join(__dirname, '.cache', 'puppeteer'))
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};