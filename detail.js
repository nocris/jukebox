const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();
// [ROMAIN] 
// comme dit précédemment mais encore pire ici ! 
// Tu vas rechercher toute ta base de données
// alors que tu n'as besoin que des chansons de l'album


let currentAlbum = null;
let currentSongIndex = null;
let currentSong = null;
let player = document.getElementById("player");
let isPlaying = false;
let textTitle = document.getElementById("text-title") 

const selectedAlbum = JSON.parse(localStorage.getItem("selectedAlbum"));

console.log(selectedAlbum)
// [ROMAIN] clean tes console log quand tu n'en as plus besoin. 
displaySongs(selectedAlbum);
title()
// [ROMAIN] 
// ce que tu fais là s'appelle du "hoisting":
// appeler une fonction avant qu'elle soit définie
// c'est pas vraiment une bonne pratique même si ça marche en JS, 
// donc pour bien cadrer ta logique je te conseille de déclarer 
// tes fonctions avant de les utiliser.

function title(){
  artists
  .forEach((artist) => {
    if(artist.id  === selectedAlbum.artist_id){
      const artistName = artist.name
      textTitle.textContent = artistName;   
      return 
    }
  })
}

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
  let new_song = null
  console.log("testtt");
  // [ROMAIN]
  // :)
  let lookForElements = songs.filter(
    (s) =>
      s.position == currentSong.position + 1 &&
      s.album_id == currentSong.album_id
      );
      if (lookForElements.length > 0) {
        new_song = lookForElements[0];
        console.log(new_song)
  } else {
    new_song = songs.filter(
      (s) => s.position == 1 && s.album_id == currentSong.album_id
    )[0];
  }
  console.log("song name " + new_song.name);

  if (!currentAlbum) {
    return;
  }
  // [ROMAIN]
  // tant qu'à faire lance la condition précédente en début de boucle,
  // ça sert à rien de faire tourner tout le code si !currentAlbum.
  if (isPlaying) {
    player.pause();
    isPlaying = false;
  }
  currentSongIndex = new_song.position;

  playSong(new_song);
}

function playPreviousSong() {
  let new_song = null
  let lookForElements = songs.filter(
    (s) =>
      s.position == currentSong.position - 1 &&
      s.album_id == currentSong.album_id
  );
  // [ROMAIN] erreur si currentSong == null à gérer
  if (lookForElements.length > 0) {
    new_song = lookForElements[0];
  } else {
    new_song = songs.filter(
      (s) => s.position == 1 && s.album_id == currentSong.album_id
    )[0];
  }
  console.log("song name " + new_song.name);

  if (!currentAlbum) {
    return;
  }
  // [ROMAIN] pareil ici
  
  if (isPlaying) {
    player.pause();
    isPlaying = false;
  }
  currentSongIndex = new_song.position;

  playSong(new_song);
  // [ROMAIN]
  // le bout de code ligne 112 à 125 est le même que 80 à 92 
  // ==> refacto
}

function displaySongs(album) {
  console.log("displaySongs(album)");
  const albumContainer = document.querySelector(
    `div[data-album="${album.id}"]`
  );

  if (albumContainer) {
    const songsDiv = albumContainer.querySelector(".songs");
    songsDiv.style.display =
      songsDiv.style.display === "none" ? "block" : "none";
    return;
  }

  const albumDiv = document.createElement("div");
  const albumName = document.createElement("h2");
  albumName.setAttribute('class', 'album-name')
  albumName.innerText = album.name;
  albumDiv.appendChild(albumName);
  albumDiv.setAttribute("data-album", album.id);
  currentAlbum = album.id;
  currentSongIndex = null;

  const songsDiv = document.createElement("ul");
  songsDiv.classList.add("songs");
  albumDiv.appendChild(songsDiv);

  // [ROMAIN]
  // pourquoi ne pas faire tout ça dans detail.html puisque ça y sera toujours ?

  songs
    .filter((song) => song.album_id === album.id)
    .forEach((song) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute('class', "button-28")
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

player.addEventListener("ended", playNextSong);

const nextButton = document.getElementById("next");
nextButton.addEventListener("click", (event)=>{
  event.preventDefault();
  // [ROMAIN]
  // as-tu besoin ici des event.preventDefault(); ? 
  playNextSong()
} );

const prevButton = document.getElementById("prev");
prevButton.addEventListener("click", (event)=>{
  event.preventDefault();
  playPreviousSong()
} );
