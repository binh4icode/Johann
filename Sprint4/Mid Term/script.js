let playpause_btn = document.getElementsByClassName("playpause-track")[0];
let current_track = document.getElementById("myAudio")
let track_art = document.getElementsByClassName("track-art")[0];
let track_name = document.getElementsByClassName("track-name")[0];
let track_author = document.getElementsByClassName("track-author")[0];
let track_desc = document.getElementsByClassName("track-desc")[0];
let now_playing = document.getElementsByClassName("now-playing")[0];
let track_list = [
//div--------------------------------------
    {
        name: "A very merry Christmas",
        author: "Santa-mixkit",
        image: "images/christmas-pictures-qv3pe11j6erqb669.jpg",
        path: "songs/mixkit-a-very-happy-christmas-897.mp3",
        file: "mixkit-a-very-happy-christmas-897.mp3"
    },
//div--------------------------------------
    {
         name: "Dreamy",
        author: "the moon-mixkit",
        image: "images/moon.jpg",
        path: "songs/mixkit-beautiful-dream-493.mp3",
        file: "mixkit-beautiful-dream-493.mp3"
    },
//div--------------------------------------
    {
        name: "how did this song get here??",
        author: "sir cat",
        image: "images/cat.jpg",
        path: "songs/mixkit-hip-hop-02-738.mp3",
        file: "mixkit-hip-hop-02-738.mp3"
    },
//div--------------------------------------
]

let track_index = 0;
//this lets the code be repeated so you dont have to type the same thing over again
function loadTrack(track_index) {
current_track.src = track_list[track_index].path;

track_art.src = track_list[track_index].image;
track_name.textContent = track_list[track_index].name;
track_author.textContent = track_list[track_index].author;
// this changes the text so instead of always saying "playing 1 of 3" it changes depending on which song you are on
now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

current_track.load();
}

loadTrack(track_index);

track_index = 0;
let isPlaying = false;
//plays the music
function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.src = "pause.png";
}
//pauses the music
function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.src = "play.png";
}

function playAndPause() {
    if(!isPlaying) playTrack();
//if the song is NOT playing, then pause, if the song IS playing, then play
    else pauseTrack();
}
//makes button clickable and fire function when clicked
playpause_btn.addEventListener("click", playAndPause);

let current_time = document.getElementsByClassName("current-time")[0];
let total_duration = document.getElementsByClassName('total-duration')[0];
let no_volume = document.getElementsByClassName("no-volume")[0];
let max_volume = document.getElementsByClassName("max-volume")[0];
let seek_slider = document.getElementsByClassName("seek_slider")[0];
let volume_slider = document.getElementsByClassName("volume_slider")[0];
//the function reajusts the time of the song based on the song
function durationUpdate() {
    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
        if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
        if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
        if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
    }
    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

function updateSlider() {
 if (!isNaN(current_track.duration) && isPlaying) {
    let sliderPosition = 0;
    sliderPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider.value = sliderPosition;
    durationUpdate();
 }   
}

function resetTimer() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

let updateTimer;

function timer() {

    clearInterval(updateTimer);
    resetTimer();
    updateTimer = setInterval(updateSlider, 1000);
}


function changeTime() {
    current_track.currentTime = current_track.duration * (seek_slider.value / 100);
}

function changeVolume() {
    current_track.volume = volume_slider.value / 100;
}

function mute() {
    volume_slider.value = 0;
    changeVolume();
}
no_volume.addEventListener("click", mute);

function loud() {
    volume_slider.value = 100;
    changeVolume();
}
max_volume.addEventListener("click", loud);

let download_btn = document.getElementsByClassName("download")[0];
//allows to add download attribute
function download_track(track_index) {
    download_btn.setAttribute("download", track_list[track_index].file);
}

download_track(track_index);
//if the index is less than the size, moves on, if its more, restart
function nextTrack() {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let next_btn = document.getElementsByClassName("next-track")[0];
next_btn.addEventListener("click", nextTrack);

function prevTrack() {
    if (track_index > 0 ) track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let prev_btn = document.getElementsByClassName("prev-track")[0];
prev_btn.addEventListener("click", prevTrack);

current_track.addEventListener("ended", nextTrack);