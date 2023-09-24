// console.log("Welcome to spotify");
// Intialisation of veriables
let songIndex = 0;
let audioElement = new Audio("song/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressbar = document.getElementById("progressbar");
let MasterName = document.getElementById("MasterName");
let songItems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName: "Thinking out Loud", filePath: "song/1.mp3" },
    {songName: "Perfect", filePath: "song/2.mp3" },
    {songName: "Rang lageya", filePath: "song/3.mp3" },
    {songName: "Untile I found you", filePath: "song/4.mp3" },
    {songName: "Shape-of-You", filePath: "song/5.mp3" },
    {songName: "Someone You Loved", filePath: "song/6.mp3" },
    {songName: "Love-Me-Like-You-Do", filePath: "song/7.mp3" }
];

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Function to reset play buttons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongitemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

// Play and pause clicks
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
    progressbar.value = 0;
});

audioElement.addEventListener('timeupdate', () => {
    progressbar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

progressbar.addEventListener('input', () => {
    audioElement.currentTime = (progressbar.value / 100) * audioElement.duration;
});

// Array to keep track of play/pause state for each song
let isPlayingArray = Array(songs.length).fill(false);

Array.from(document.getElementsByClassName('SongitemPlay')).forEach((element) => {
    let songId = parseInt(element.id);
    
    element.addEventListener('click', (e) => {
        if (isPlayingArray[songId]) {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            makeAllPlays();
        } else {
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            // songIndex = songId;
            songIndex = Array.from(document.getElementsByClassName('SongitemPlay')).indexOf(e.target);
            audioElement.src = songs[songIndex].filePath;
            MasterName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
        }
        
        isPlayingArray[songId] = !isPlayingArray[songId];
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        MasterName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0 ){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    MasterName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})