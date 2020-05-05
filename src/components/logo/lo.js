import $ from "jquery";
import music from './media/crush_tessa_violet.mp3'



$(function () {

  // var flag = false;
  // var x = document.getElementById("myAudio"); 
  // // x.play(); 
  // function playAudio() { 
  //   x.play(); 
  //   console.log(x.currentTime);
  // } 
  // function getCurTime() { 
  //   console.log(x.currentTime);
  // } 
  // function pauseAudio() { 
  //   x.pause(); 
  // } 
    var text = $(".text");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
  
      if (scroll >= 100) {
        text.removeClass("hidden");
          // if(!flag){
          //   playAudio();
          //   flag = true;
          // }
        
      } else {
        text.addClass("hidden");
        // if(flag){
        //   pauseAudio();
        //   flag = false;
        // }
      }
    });
  });
  