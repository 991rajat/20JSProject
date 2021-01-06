const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


//Play and Pause VIdeo
function toggleVideo(e){

    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    return  true;
}

//update Play/Pause icon
function updatePlayIcon(){

    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

//update Progress
function updateProgress(e){

    progress.value = (video.currentTime / video.duration)*100;

    let mins = Math.floor(video.currentTime/60);
    if(mins<10){
        mins = '0'+String(mins);
    }


    let secs = Math.floor(video.currentTime%60);
    if(secs<10){
        secs = '0'+String(secs);
    }

    timestamp.innerHTML = mins + ":"+ secs;

}

//set video time to progress
function setVideoProgress(){

    video.currentTime = (+progress.value*video.duration) /100
}

//stop video
function stopVideo(){

    video.currentTime = 0;
    video.pause();
}


//Event Listeners
video.addEventListener('click',toggleVideo);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);


play.addEventListener('click',toggleVideo);

stop.addEventListener('click',stopVideo);

progress.addEventListener('change',setVideoProgress);