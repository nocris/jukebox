const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();
const info = document.getElementById("info");

let isPlaying = false;

function playSong(songsFromAlbum, i, audio) {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  }
  audio.setAttribute("src", `./public/uploads/${songsFromAlbum[i].path}`);
  audio.play();
  currentSong = i;

  audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songsFromAlbum.length;
    audio.setAttribute("src", `./public/uploads/${songsFromAlbum[currentSong].path}`);
    audio.play();
  });
}


/*** Display artists list ***/
artists.forEach((artist) => {
  let ulArtist = document.createElement("ul");
  ulArtist.setAttribute("id", "artist_" + artist.id);
  ulArtist.innerText = artist.name;
  info.appendChild(ulArtist);

  /*** Display albums list filtered by artist ***/
  albums.forEach((album) => {
    if (artist.id === album.artist_id) {
      let button = document.createElement("button");
      button.innerText = album.name;
      let li = document.createElement("li");
      li.setAttribute("id", "album_" + album.id);
      li.appendChild(button);
      ulArtist.appendChild(li);
      let divAlbum = document.createElement("div");
      divAlbum.setAttribute("id", "albumDiv_" + album.id);
      ulArtist.appendChild(divAlbum);

      /*** On click display songs from album ***/
      const ulSongs = document.createElement("ul");
      button.addEventListener("click", function () {
        ulSongs.innerHTML = "";
        const songsFromAlbum = versions.findSongsFromAlbumId(album.id);

        const audio = document.getElementById("audio");

        for (let i = 0; i < songsFromAlbum.length; i++) {
          let currentSong = -1;
          const song = document.createElement("button");
          song.setAttribute("id", "song_" + songsFromAlbum[i].id);
          song.innerText = songsFromAlbum[i].name;
          ulSongs.appendChild(song);

          /*** Play song***/
          song.addEventListener(
            "click", () => {
            playSong(songsFromAlbum, i, audio);
          }
          );
        }
        /*** Next song ***/
        const nextButton = document.getElementById("next");
        nextButton.addEventListener("click", () => {
          if (isPlaying) {
            audio.pause();
            isPlaying = false;
          }
          if (currentSong === -1) {
            return;
          }
          currentSong =
            (currentSong + 1 + songsFromAlbum.length) % songsFromAlbum.length;
          audio.setAttribute(
            "src",
            `./public/uploads/${songsFromAlbum[currentSong].path}`
          );
          audio.addEventListener("loadedmetadata", () => {
            audio.play();
            isPlaying = true;
          });
        });

        /*** Open and close album ***/
        if (divAlbum.children.length === 0) {
          divAlbum.appendChild(ulSongs);
        } else {
          divAlbum.innerHTML = "";
        }
      });
    }
  });
});