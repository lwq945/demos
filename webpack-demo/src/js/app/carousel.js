var $ = require('../lib/jquery-3.1.1.min.js')

function Carousel($ct){
  this.$ct=$ct
  this.init()
  this.bind()
  this.play(0)
  this.autoPlay()
}

Carousel.prototype={
  init:function(){
    this.$imgCt = this.$ct.find('.img-ct')
    this.$imgs = this.$ct.find('.img-ct >li')
    this.$prev = this.$ct.find('.prev')
    this.$next = this.$ct.find('.next')
    this.$bullets = this.$ct.find('.bullet>li')
    this.imgCount = this.$imgs.length
    this.imgIndex = 0
    this.isAnimate = false
  },

  bind:function(){
    var _this=this

    this.$next.on('click', function(){
      _this.playNext();
    });

    this.$prev.on('click', function(){
      _this.playPrev();
    });

    this.$bullets.on('click', function(){
      var idx = $(this).index();
      _this.play(idx);
    });
  },

  playPrev:function(){

    this.play((this.imgCount+this.imgIndex-1)%this.imgCount)
  },

  playNext:function(){
    this.play((this.imgIndex+1)%this.imgCount)
  },

  play:function(idx){
    this.idx=idx
    var _this=this
    if(this.isAnimate) return;
      this.isAnimate = true;
      this.$imgs.eq(this.imgIndex).fadeOut(500);
      this.$imgs.eq(this.idx).fadeIn(500, function(){
        _this.isAnimate = false;
      });
      
      this.imgIndex = this.idx;
      this.setBullet();
  },

  setBullet:function(){
    this.$bullets.removeClass('active').eq(this.imgIndex).addClass('active');
  },

  autoPlay:function(){
    var _this=this
    clock = setInterval(function(){
        _this.playNext();
     }, 2000); 
  }
}
module.exports = Carousel;

// Carousel2=(function(){
//   function Carousel($ct){
//     this.$ct=$ct
//     this.init()
//     this.bind()
//     this.play(0)
//     this.autoPlay()
//   }

//   Carousel.prototype={
//     init:function(){
//       this.$imgCt = this.$ct.find('.img-ct')
//       this.$imgs = this.$ct.find('.img-ct >li')
//       this.$prev = this.$ct.find('.prev')
//       this.$next = this.$ct.find('.next')
//       this.$bullets = this.$ct.find('.bullet>li')
//       this.imgCount = this.$imgs.length
//       this.imgIndex = 0
//       this.isAnimate = false
//     },

//     bind:function(){
//       var _this=this

//       this.$next.on('click', function(){
//         _this.playNext();
//       });

//       this.$prev.on('click', function(){
//         _this.playPrev();
//       });

//       this.$bullets.on('click', function(){
//         var idx = $(this).index();
//         _this.play(idx);
//       });
//     },

//     playPrev:function(){

//       this.play((this.imgCount+this.imgIndex-1)%this.imgCount)
//     },

//     playNext:function(){
//       this.play((this.imgIndex+1)%this.imgCount)
//     },

//     play:function(idx){
//       this.idx=idx
//       var _this=this
//       if(this.isAnimate) return;
//         this.isAnimate = true;
//         this.$imgs.eq(this.imgIndex).fadeOut(500);
//         this.$imgs.eq(this.idx).fadeIn(500, function(){
//           _this.isAnimate = false;
//         });
        
//         this.imgIndex = this.idx;
//         this.setBullet();
//     },

//     setBullet:function(){
//       this.$bullets.removeClass('active').eq(this.imgIndex).addClass('active');
//     },

//     autoPlay:function(){
//       var _this=this
//       clock = setInterval(function(){
//           _this.playNext();
//        }, 2000); 
//     }
//   }

//   return {
//     start:function($ct){
//       $ct.each(function(index,node){
//         new Carousel($(node));
//       })
//    }
//  }

// })()

// Carousel2.start($('#carousel'))