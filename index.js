/*
slideShow
*/
var theIndex=1;

showImg(theIndex);

function changeImg(n){
    showImg(theIndex += n);
}

function currentSlide(n){
    showImg(theIndex =n);
}

function showImg(n){
 
    var x = document.getElementsByClassName("slide_container");
    var dot=document.getElementsByClassName("dot");
    
    if (n > x.length) {theIndex = 1} 
    if (n < 1) {theIndex = x.length} 
    
    for (var i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    } 
    for(var i=0;i<dot.length;i++){
        dot[i].className = dot[i].className.replace(" active","");
    }
     x[theIndex-1].style.display ="block";  
    dot[theIndex-1].className +=" active";   
}


/*
player
*/
var audio=new Audio("/mp3/A-Sky-Full-Of-Stars.mp3");
var audioName="A Sky Full of Stars";
var play_btn=document.getElementsByClassName("new_play_btn");
var play_btn_icon=document.getElementsByClassName("icon_change");
var fill=document.getElementById("fill");
var seekBar=document.getElementById("seekBar");
var music_current_time=document.getElementById("music_current_time");
var music_durantion=document.getElementById("music_durantion");
var player_songTitle=document.getElementById("player_songTitle");

function playMusic(){
       if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
    player_songTitle.textContent=audioName;
    
      if(audio.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else {
        if(audio.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":"+Math.floor(audio.currentTime%60);
    }
    }
        
       if(audio.duration%60<10){
      music_durantion.innerHTML="0"+Math.floor(audio.duration/60)+":0"+Math.floor(audio.duration%60);
        }else{
      music_durantion.innerHTML="0"+Math.floor(audio.duration/60)+":"+Math.floor(audio.duration%60);  
        }
}

audio.addEventListener("play",function(){
    for(i=0;i<play_btn_icon.length;i++){
        play_btn_icon[i].innerHTML="&#10073;&#10073;";
    }
    
})

audio.addEventListener("pause",function(){
    for(i=0;i<play_btn_icon.length;i++){
    play_btn_icon[i].innerHTML="&#9658;";
    }
})

audio.addEventListener("timeupdate", function(){
    fill.style.width=audio.currentTime/audio.duration *100+"%";
    
      if(audio.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else {
        if(audio.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":"+Math.floor(audio.currentTime%60);
    }
    }
})

function range(min,val,max){
    return Math.min(Math.max(min,val),max);
}

function getPosition(e){
      var position=(e.clientX-seekBar.offsetLeft)/seekBar.clientWidth;
    
    position=range(0,position,1);
    return position;
}
var mouseDown=false;
seekBar.addEventListener("mousedown",function(e){
    mouseDown=true;
    var position=getPosition(e);    
    fill.style.width=position*100+"%";
})

seekBar.addEventListener("mouseup",function(e){
    var position=getPosition(e);    
    fill.style.width=position*100+"%";
    audio.currentTime=position*audio.duration;
    
    if(audio.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else {
        if(audio.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":0"+Math.floor(audio.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio.currentTime/60)+":"+Math.floor(audio.currentTime%60);
    }
    }
         
})





