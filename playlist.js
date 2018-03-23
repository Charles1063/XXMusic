

/*study music*/
var study_music_src=["/mp3/Shake-It-Off.mp3","/mp3/Single-Ladies.mp3","/mp3/A-Sky-Full-Of-Stars.mp3"];
var study_music_name=["Shake it off","Single Ladies","A Sky Full of Starts"];
var audio_study=new Audio();
var currentMusic=0;
var study_music_play=document.getElementById("study_music_play");
var fill=document.getElementById("fill");
var seekBar=document.getElementById("seekBar");
var music_current_time=document.getElementById("music_current_time");
var player_play=document.getElementById("player_play");
var player_songTitle=document.getElementById("player_songTitle");

function palyer_playMusic(){
     if(audio_study.paused){
        audio_study.play();
    }else{
        audio_study.pause();
}
}

 function displayTime(){
      if(audio_study.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else {
        if(audio_study.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":"+Math.floor(audio_study.currentTime%60);
    }
    }     
 }

  audio_study.src=study_music_src[currentMusic];
  player_songTitle.innerHTML=study_music_name[currentMusic];
function playMusicList_study(){
     if(audio_study.paused){
         
        audio_study.play();
    }else{
        audio_study.pause();
}   
    displayTime();
     
}


audio_study.addEventListener("play", function(){
 
     study_music_play.innerHTML="&#10073;&#10073;";
     player_play.innerHTML="&#10073;&#10073;";
})

audio_study.addEventListener("pause", function(){

     study_music_play.innerHTML="&#9658;";
    player_play.innerHTML="&#9658;";
})

audio_study.addEventListener("timeupdate", function(){
    fill.style.width=audio_study.currentTime/audio_study.duration *100+"%";
    
      if(audio_study.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else {
        if(audio_study.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":"+Math.floor(audio_study.currentTime%60);
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
    audio_study.currentTime=position*audio_study.duration;
    
    if(audio_study.currentTime<10){
      music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else {
        if(audio_study.currentTime%60<10){
       music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":0"+Math.floor(audio_study.currentTime%60);
    }else{
        music_current_time.innerHTML="0"+Math.floor(audio_study.currentTime/60)+":"+Math.floor(audio_study.currentTime%60);
    }
    }
         
})


/*drive music*/
var audio_drive=new Audio();
var drive_music_src=["/mp3/Single-Ladies.mp3","/mp3/A-Sky-Full-Of-Stars.mp3","/mp3/Shake-It-Off.mp3"];
var drive_music_play=document.getElementById("drive_music_play");

function playMusicList_drive(){
   
     if(audio_drive.paused){
        audio_drive.src=drive_music_src[currentMusic];
        audio_drive.play();
       
    }else{
        audio_drive.pause();
}       
}

audio_drive.addEventListener("play", function(){
 
     drive_music_play.innerHTML="&#10073;&#10073;";
})

audio_drive.addEventListener("pause", function(){

     drive_music_play.innerHTML="&#9658;";

})
/*next music*/
function changeMusic(){
    if(audio_study.paused){
         audio_study.src=study_music_src[currentMusic];
        audio_study.pause();
        displayTime();
    }else{
         audio_study.src=study_music_src[currentMusic];
        audio_study.play();
        displayTime();
    }
     player_songTitle.innerHTML=study_music_name[currentMusic];
}

function nextMusic(){
    
    currentMusic++;
    if(currentMusic>2){
       currentMusic=0;
       }
    changeMusic();
    
}
function preMusic(){
     currentMusic--;
    if(currentMusic<0){
        currentMusic=2;
    }
 changeMusic();

}

