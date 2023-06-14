const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();
const info = document.getElementById("info");

let currentAlbum = null;
let currentSongIndex = null;
let currentSong = null;
let player = document.getElementById("player");
let isPlaying = false;

function playSong(song) {
  currentSongIndex = song.position;
  currentSong = song;
  if (isPlaying) {
    player.pause();
    isPlaying = false;
  }
  console.log("currentAlbum" + currentAlbum);
  console.log("currentSongIndex" + currentSongIndex);

  player.setAttribute("src", `./public/uploads/${song.path}`); 
  // player.setAttribute("src", song.path);
  player.play();

  isPlaying = true;
}

function playNextSong() {
  console.log("testtt")
  let lookForElements = songs.filter((s) => s.position == currentSong.position + 1 && s.album_id == currentSong.album_id)
  if (lookForElements.length > 0) {
      new_song = lookForElements[0]
  } else {
    new_song = songs.filter((s) => s.position == 1 && s.album_id == currentSong.album_id)[0]
  }
  console.log('song name ' + new_song.name)

  if (!currentAlbum) {
    return;
  }
  if (isPlaying) {
    player.pause();
    isPlaying = false;
  }
  currentSongIndex = new_song.position;


  playSong(new_song);
}

function playPreviousSong() { 
let lookForElements = songs.filter((s) => s.position == currentSong.position - 1 && s.album_id == currentSong.album_id)
if (lookForElements.length > 0) {
    new_song = lookForElements[0]
} else {
  new_song = songs.filter((s) => s.position == 1 && s.album_id == currentSong.album_id)[0]
}
console.log('song name ' + new_song.name)

if (!currentAlbum) {
  return;
}
if (isPlaying) {
  player.pause();
  isPlaying = false;
}
currentSongIndex = new_song.position;


playSong(new_song);

}

function displaySongs(album) {
    const albumContainer = document.querySelector(`div[data-album="${album.id}"]`);
  
    if (albumContainer) {
      const songsDiv = albumContainer.querySelector(".songs");
      songsDiv.style.display = songsDiv.style.display === "none" ? "block" : "none";
      return;
    }
  
    const albumDiv = document.createElement("div");
    const albumName = document.createElement("h2");
    albumName.innerText = album.name;
    albumDiv.appendChild(albumName);
    albumDiv.setAttribute("data-album", album.id);
    currentAlbum = album.id;
    currentSongIndex = null;
  
    const songsDiv = document.createElement("ul");
    songsDiv.classList.add("songs");
    albumDiv.appendChild(songsDiv);
  
    songs
      .filter((song) => song.album_id === album.id)
      .forEach((song) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = song.name;
        button.addEventListener("click", () => {
          playSong(song);
        });
        li.appendChild(button);
        songsDiv.appendChild(li);
      });
  
    const albumContainerDiv = document.createElement("div");
    albumContainerDiv.classList.add("album");
    albumContainerDiv.appendChild(albumDiv);
  
    info.appendChild(albumContainerDiv);
}

function displayAlbum(album) {
  const albumDiv = document.createElement("div");
  const albumName = document.createElement("h2");
  albumName.innerText = album.name;
  albumDiv.appendChild(albumName);

  const ulSongs = document.createElement("ul");
  songs
    .filter((song) => song.album_id === album.id)
    .forEach((song) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = song.name;
      button.addEventListener("click", () => playSong(song));
      li.appendChild(button);
      ulSongs.appendChild(li);
    });

  albumDiv.appendChild(ulSongs);
  info.appendChild(albumDiv);
}

function displayAlbums(artist) {
  const artistDiv = document.createElement("div");
  const artistName = document.createElement("h2");
  artistName.innerText = artist.name;
  artistDiv.appendChild(artistName);

  const ulAlbums = document.createElement("ul");
  albums
    .filter((album) => album.artist_id === artist.id)
    .forEach((album) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = album.name;

      button.addEventListener("click", () => displaySongs(album));
      li.appendChild(button);
      ulAlbums.appendChild(li);
    });

  artistDiv.appendChild(ulAlbums);
  info.appendChild(artistDiv);
}

artists.forEach((artist) => {
  displayAlbums(artist);
});

function goToAdmin(){
    window.location.replace(
        'admin.html'
    )
}

player.addEventListener("ended", playNextSong);


const nextButton = document.getElementById("next");
nextButton.addEventListener("click", playNextSong);

const prevButton = document.getElementById("prev");
prevButton.addEventListener("click", playPreviousSong);

const pageAdmin = document.getElementById("admin");
console.log(pageAdmin)
pageAdmin.addEventListener("click", goToAdmin);