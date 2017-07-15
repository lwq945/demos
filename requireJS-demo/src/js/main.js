require.config({
	baseUrl:"src/js/app",
	paths:{
		"jquery": "../lib/jquery-3.1.1.min"
		// "carousel": "./app/carousel",
		// "gotop": "./app/gotop",
		// "waterfallLoad": "./app/waterfallLoad"
	}
	
})

require(['carousel','gotop','waterfallLoad'],function(Carousel,GoTop,waterfallLoad){
	new Carousel($('#carousel'));
	new GoTop()
	new waterfallLoad()
})