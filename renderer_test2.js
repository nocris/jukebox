const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();
const info = document.getElementById("info");

let currentAlbum = null;
let currentSongIndex = null;
let currentSong = null;
let player = document.getElementById("player");
let isPlaying = false;

// function displayAlbum(album) {
//   console.log('displayAlbum(album)')
//   const albumDiv = document.createElement("div");
//   const albumName = document.createElement("h2");
//   albumName.innerText = album.name;
//   albumDiv.appendChild(albumName);

//   const ulSongs = document.createElement("ul");
//   songs
//     .filter((song) => song.album_id === album.id)
//     .forEach((song) => {
//       const li = document.createElement("li");
//       const button = document.createElement("button");
//       button.innerText = song.name;
//       button.addEventListener("click", () => playSong(song));
//       li.appendChild(button);
//       ulSongs.appendChild(li);
//     });

//   albumDiv.appendChild(ulSongs);
//   info.appendChild(albumDiv);
// }

//Auto display artists

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

      button.addEventListener("click", () => {
        selectedAlbum = album; // Imposta l'ID dell'album corrente
        localStorage.setItem('selectedAlbum', JSON.stringify(selectedAlbum))
        window.location.replace(
          'detail.html'
      )
      });
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

//konami code to access admin page
const konamiCode = ["c", "a", "s", "u", " ", "m", "a", "r", "z", "u"];
let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Sequenza Konami completata
      goToAdmin()
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});


