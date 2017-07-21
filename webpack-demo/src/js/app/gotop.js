var $ = require('../lib/jquery-3.1.1.min.js')

function GoTop(){

  this.init()
  this.bind()
}

GoTop.prototype ={

  init:function(){
    this.$ct=$(document)
    this.$gotop = $('<div id="go-top">回到顶部</div>');
    $('body').append(this.$gotop);
    
  },

  bind:function(){
    var _this=this

    this.$gotop.on('click',function(){
      _this.goToTop()
    })

    this.$ct.on('scroll',function(){
      _this.scroll()
    })
  },

  goToTop:function(){
    this.$ct.scrollTop(0);
  },

  scroll:function(){
    var scrollTop = this.$ct.scrollTop();
    if (scrollTop > 100) {
      this.$gotop.show();
    } else {
      this.$gotop.hide();
    }
  }

}

module.exports = GoTop;





// var GoTop = (function(){
//   var $goTop = $('<div id="go-top">回到顶部</div>');
//   $('body').append($goTop);

//   function init (){
//     $(window).on('scroll', function(){
//       var offsetTop = $('body').scrollTop();
//       if(offsetTop>100){

//         $goTop.show();
//       }else{
//         $goTop.hide();
//       }
//     })
//     $goTop.on('click', function(){
//       $(window).scrollTop(0);
//     });

//   }

//   return {
//     init: init
//   }
// })();

// GoTop.init();