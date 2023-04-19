const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();

const info = document.getElementById("info");

/*** Display artists list ***/
artists.forEach((artist) => {
  let ul = document.createElement("ul");
  ul.setAttribute("id", "artist" + artist.id);
  ul.innerText = artist.name;
  info.appendChild(ul);

  /*** Display albums list filtered by artist ***/
  albums.forEach((album) => {
    if (artist.id === album.artist_id) {
      let button = document.createElement("button");
      button.innerText = album.name;
      let li = document.createElement("li");
      li.setAttribute("id", "album" + album.id);
      li.appendChild(button);
      ul.appendChild(li);
      let div = document.createElement("div");
      ul.appendChild(div)


      /*** On click display songs from album ***/
      button.addEventListener("click", function () {
        div.innerHTML = ""
        const songsFromAlbum = versions.findSongsFromAlbumId(album.id);
        let ulSongs = document.createElement("ul");
        // audio.setAttribute(
        //   "src",
        //   `./public/uploads/${songsFromAlbum[i].path}`
        // );
        for (let i = 0; i < songsFromAlbum.length; i++) {
          const song = document.createElement("button");
          song.setAttribute("id", "song_" + songsFromAlbum[i].id);

          song.innerText = songsFromAlbum[i].name;
          ulSongs.appendChild(song);

          const audio = document.getElementById("audio");
          song.addEventListener("click", () => {
            audio.setAttribute(
              "src",
              `./public/uploads/${songsFromAlbum[i].path}`
            );
            audio.play();
          });
        }
        div.appendChild(ulSongs);
      });
    }

  });
});
