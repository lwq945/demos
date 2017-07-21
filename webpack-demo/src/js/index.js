var $ = require('./lib/jquery-3.1.1.min.js')
var Carousel = require('./app/carousel')
var GoTop = require('./app/gotop')
var waterfallLoad = require('./app/waterfallLoad')


new Carousel($('#carousel'));
new GoTop()
new waterfallLoad()
