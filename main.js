// VARIAVEIS
//Botões do player de musica
const btn_play = document.getElementById("play");
const btn_prev = document.getElementById("prev");
const btn_next = document.getElementById("next");
// Progress bar
const progress_bar = document.getElementById("progress-bar");
const progress_area = document.getElementById("progress-area");
//Timers da musica
const current_time = document.getElementById("current-time");
const duration_time = document.getElementById("duration-time");
// Atributos da música
const music_file = document.querySelector("audio");
const music_name = document.getElementById("title-song");
const artist_name = document.getElementById("artist-name");
const album_name = document.getElementById("album-name");
const image_album = document.getElementById("album-image");
let isPlaying = false;
let musicIndex = 0;
const songsList = [
    // Musica 1
    {
        title:"Roaring 20s",
        artist:"Panic! At The Disco",
        album:"Pray For The Wicked",
        albumImage:"PFTW",
        trackFile:"roaring20s",
    },
    // Musica 2
    {
        title:"House of Memories",
        artist:"Panic! At The Disco",
        album:"Death of a Bachelor",
        albumImage:"DOAB",
        trackFile:"HouseOfMemories",
    },
    // Musica 3
    {
        title:"Casual Affair",
        artist:"Panic! At The Disco",
        album:"Too Weird to Live, Too Rare to Die",
        albumImage:"TWTLTRTD",
        trackFile:"CasualAffair",
    },
    // Musica 4
    {
        title:"Trade Mistakes",
        artist:"Panic! At The Disco",
        album:"Vices & Virtues",
        albumImage:"V&V",
        trackFile:"trademistakes",
    },
    // Musica 5
    {
        title:"When the Day Met the Night",
        artist:"Panic! At The Disco",
        album:"Pretty. Odd.",
        albumImage:"PO",
        trackFile:"thedaymetnight",
    },
    // Musica 6
    {
        title:"I Constantly Thank God For Esteban",
        artist:"Panic! At The Disco",
        album:"A Fever You Can't Sweet Out",
        albumImage:"AFYCSO",
        trackFile:"esteban",
    }
];
//Função para dar play na música
const Play = () =>{
    music_file.play();
    isPlaying = true;
    btn_play.classList.remove('onPause');
    btn_play.classList.add('onPlay');
}
//Função para pausar a música
    const Pause = () =>{
    music_file.pause();
    isPlaying = false;
    btn_play.classList.remove('onPlay');
    btn_play.classList.add('onPause');
}
// Adicionando um evento de click no botão de play da música
btn_play.addEventListener("click", function(){
    if(isPlaying == false)
    {
        Play();
    }
    else
    {
        Pause();
    }
})

const LoadSong = (currentSong) =>
{
    music_name.textContent = currentSong.title;
    artist_name.textContent = currentSong.artist;
    album_name.textContent = currentSong.album;

    music_file.src = "musics/" + currentSong.trackFile + ".mp3";
    image_album.src = "images/" + currentSong.albumImage + ".jpg";
}

LoadSong(songsList[0]);

const NextSong = () =>{
    musicIndex = (musicIndex + 1) % songsList.length;
    LoadSong(songsList[musicIndex]);
    Play();
}

const PrevSong = () =>{
    musicIndex = (musicIndex - 1 + songsList.length) % songsList.length;
    LoadSong(songsList[musicIndex]);
    Play();
}

btn_next.addEventListener("click", NextSong);
btn_prev.addEventListener("click", PrevSong);

var update = setInterval(function() {
    var mins = Math.floor(music_file.currentTime / 60);
    var secs = Math.floor(music_file.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    current_time.innerHTML = mins + ':' + secs;
  }, 10);

  function getDuration(src, cb) {
    $(music_file).on("loadedmetadata", function(){
        cb(music_file.duration);
    });
    music_file.src = src;
}
music_file.addEventListener("timeupdate", function() {
    var timeleft = document.getElementById('duration-time'),
        duration = parseInt( music_file.duration ),
        currentTime = parseInt( music_file.currentTime),
        timeLeft = duration - currentTime,
        s, m;
    
    
    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;
    
    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;
    
    timeleft.innerHTML = m+":"+s;
    
}, false);

var player = document.getElementById('music_file');    
music_file.addEventListener("timeupdate", function() {
    var currentTime = music_file.currentTime;
    var duration = music_file.duration;
    $('.progress-bar').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},1,'linear');
});


