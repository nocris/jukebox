console.log("Songs", versions.findAllSongs());
console.log("Albums", versions.findAllAlbums());
console.log("Artists", versions.findAllArtists());

const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const songs = versions.findAllSongs();

const info = document.getElementById("info");

// function myFunction() {
//     var x = document.getElementById("button");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }

/*** Display artists list ***/
artists.forEach((artist) => {
  let ul = document.createElement("ul");
  ul.setAttribute("id", "artist" + artist.id);
  ul.innerText = artist.name;
  info.appendChild(ul);

  /*** Display albums list filtered by artist ***/
  albums.forEach((album) => {
    if (artist.id === album.artist_id) {
      let li = document.createElement("li");
      li.setAttribute("id", "album" + album.id);

      let button = document.createElement("button");
      button.setAttribute("onclick", "myFunction()"); ///non funziona!!!
      button.innerText = album.name;

      /*** On click display songs from album ***/ 
        button.addEventListener("click", function () {
        const songsFromAlbum = versions.findSongsFromAlbumId(album.id);
        for (let i = 0; i < songsFromAlbum.length; i++) {
          let song = document.createElement("li");
          song.setAttribute("id", "song" + songsFromAlbum[i].id);

          song.innerHTML = songsFromAlbum[i].name;
          button.appendChild(song);

          console.log(songsFromAlbum[i].name);
        }
      });

      li.appendChild(button);
      ul.appendChild(li);
    }
  });
});

