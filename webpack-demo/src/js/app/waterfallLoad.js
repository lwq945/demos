var $ = require('../lib/jquery-3.1.1.min.js')

function waterfallLoad(){
		this.init()
		this.bind()
		this.start()
}

waterfallLoad.prototype={

	init:function(){

		this.pageIndex =1
		this.dataCount =10
		this.nodeWidth = $('.item').outerWidth(true)
		this.colNum = parseInt($('.sub-ct').width()/this.nodeWidth)
		this.isDataArrive = true
		this.colHeight=[]
		for (var i = 0 ; i < this.colNum; i++) {
			this.colHeight.push(0);
		}
	},

	bind:function(){
		var _this=this
		$('.load').click(function(){
	  	if(!_this.isDataArrive) return;
	  	_this.start()
	  })
	},

	start:function(){
		var _this=this
		this.getData(function(newsList){
		//得到数据
		console.log(newsList);
		this.isDataArrive = true;
		//处理newsList的每一项
			$.each(newsList,function(idx,news){
				//先得到一个节点
				var $node=_this.getNode(news);
				//判断这个节点的图片是否加载完
				$node.find('img').on('load',function(){
					//添加到父容器
					$('.sub-ct').append($node);
					_this.waterfallPlace($node);
				})
			})
		})
		this.isDataArrive = false;
		},

	getData:function(callback){
		this.callback=callback;
		var _this=this
		$.ajax({
	    url: '//platform.sina.com.cn/slide/album_tech',
	    dataType: 'jsonp',
	    jsonp: "jsoncallback",
	    data:{
	    	app_key: '1271687855',
	    	num: this.dataCount,
	     page: this.pageIndex
	    },
	    success: function(res){
	      if(res && res.status && res.status.code==="0"){
	        // console.log(res);
	         _this.callback(res.data); //传递结果
	         _this.pageIndex++;
	        }      
	    },
	    error: function(){
	      console.log('系统出错了...');
	    }
	  })  
	},

	getNode:function(item){
		var htmls='';
		htmls+='<li class="item">';
	  htmls+='<a href="'+item.url+'"><img src="'+item.img_url+'" alt=""></a>';
		htmls+='<h4>'+item.short_name+'</h4>';
		htmls+='<p>'+item.short_intro+'</p></li> ';
		
		return $(htmls);
	},

	waterfallPlace:function($node){
		var _this=this
		// var minHeight =Math.min.apply(null,_this.colHeight);
	// 	var minIndex =this.colHeight.indexOf(minHeight);
		var idx = 0,
		  minHeight = this.colHeight[0];

		for(var i=0;i<this.colHeight.length; i++){
			if(this.colHeight[i] < minHeight){
				idx = i;
				minHeight = this.colHeight[i];
			}
		}

		$node.css({
			top: minHeight,
			left: this.nodeWidth*idx
	});

	// colHeight[minIndex]+= $node.outerHeight(true);
		this.colHeight[idx] = $node.outerHeight(true) + this.colHeight[idx];
		$('.sub-ct').height(Math.max.apply(null,this.colHeight));
	}

}


module.exports = waterfallLoad
