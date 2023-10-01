const music = [
   {
      title: 'Ambient',
      artist: "No Name",
      url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/ambient.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1534790021298-16d65d290461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
   },
   {
      title: 'Garage',
      artist: "No Name",
      url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/garage.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
   },
   {
      title: 'Night Vlog',
      artist: "No Name",
      url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/night-vlog.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1504972090022-6edb81e4e534?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
   },
   {
      title: 'Study',
      artist: "No Name",
      url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/study.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
   },
   {
      title: 'Forest',
      artist: "No Name",
      url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/forest.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
   },
]

const titleEl = document.querySelector("#title");
const artistEl = document.querySelector("#artist");
const thumbnailEl = document.querySelector("#thumbnail");
const progressEl = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const totalTimeEl = document.querySelector("#total-time");
const repeatBtn = document.querySelector("#repeat");
const prevBtn = document.querySelector("#prev");
const toggleBtn = document.querySelector("#toggle");
const nextBtn = document.querySelector("#next");
const shuffleBtn = document.querySelector("#shuffle");
const playlistEl = document.querySelector("#playlist");
const songsEls = [];
console.log(nextBtn);
let activeSongIdx = undefined
music.forEach((songs, idx) => {
   const songBtn = document.createElement('button')
   const song = document.createElement('audio')
   songsEls.push(song)
   songBtn.className = 'py-2 hover:font-bold flex justify-between w-full'
   song.src = songs.url;
   song.controls = true
   song.classList.add("hidden")
   playlistEl.appendChild(song)
   //Şəkillərin daha sürətli yüklənməsini təmin etmək üçün səhvlər
   const hiddenImgEl = document.createElement('img')
   hiddenImgEl.classList.add("hidden")
   hiddenImgEl.src = songs.thumbnail
   document.body.appendChild(hiddenImgEl)
   song.addEventListener('loadedmetadata', () => {
      const time = getReadableTime(song.duration);
      songs.time = time
      songBtn.innerHTML = `${songs.title} <span>${time}</span>`
      playlistEl.appendChild(songBtn)
      if (idx === 0) {
         activeSongIdx = idx
         setSongDetails(songs)
         songBtn.classList.add("font-bold")
      }
   })
   song.addEventListener("timeupdate", () => {
      const time = song.currentTime;
      updateProgress(time);
      currentTimeEl.innerHTML = getReadableTime(time)
   })
   songBtn.addEventListener("click", () => {
      stopPlayingSong()
      songBtn.classList.add('font-bold')
      activeSongIdx = idx;
      setSongDetails(songs)
   })
})
toggleBtn.addEventListener("click", () => {
   if (songsEls[activeSongIdx].paused) {
      toggleBtn.classList.add("play")
      songsEls[activeSongIdx].play()
   } else {
      songsEls[activeSongIdx].pause()
      toggleBtn.classList.remove("play")
   }
})
nextBtn.addEventListener('click', ()=>{
   stopPlayingSong()
   activeSongIdx++
   if(activeSongIdx > music.length - 1){
      activeSongIdx = music.length - 1
   }
   setSongDetails(music[activeSongIdx])
})
prevBtn.addEventListener('click', ()=>{
  stopPlayingSong()
   activeSongIdx--
   if(activeSongIdx < 0){
      activeSongIdx = 0
   }
   setSongDetails(music[activeSongIdx])
})
function updateProgress(time) {
   progressEl.value = time / songsEls[activeSongIdx].duration * 100
}
function stopPlayingSong(){
// diger musiqiye kecdikde stop edirik
   toggleBtn.classList.remove("play")
   songsEls[activeSongIdx].pause()
}
function setSongDetails(songs) {
   songsEls[activeSongIdx].currentTime = 0;
   currentTimeEl.innerText = '0:00';
   totalTimeEl.innerText = songs.time;
   thumbnailEl.src = songs.thumbnail;
   titleEl.innerText = songs.title
   artistEl.innerText = songs.artist
}
function getReadableTime(duration) {
   return `${Math.floor(duration / 60)} : ${`${Math.floor(duration % 60)}`.padStart(2, '0')}`
}

