//Function that on button click resend to the right page (Artist || Album || Song
// import * as fs from './preload';
const fs = versions.fs;

const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();
const postArtist = versions.postArtist;
const postAlbum = versions.postAlbum;

const centralContainer = document.getElementById("central-container");
const submitButton = document.getElementById("submit-button");
const artistLogo = document.getElementById("artist-logo");
const uploadLogo = document.getElementById("upload-logo");
const musicLogo = document.getElementById("music-logo");
const inputArtist = document.getElementById("inputArtist");
const inputArtistText = document.getElementById("inputArtistText");
const inputAlbum = document.getElementById("inputAlbum");
const inputAlbumText = document.getElementById("inputAlbumText");
const inputSong = document.getElementById("inputSong");
const form = document.getElementById("form");
const addArtist = document.getElementById("add-artist").value;
const addAlbum = document.getElementById("add-album").value;
const pathTest = "./test";

window.onclick = (e) => {
  if (e.target.id === "artist-logo") {
    sendAndCreateNewArtist();
    submitButton.setAttribute('class' ,'submit-1')
  } else if (e.target.id === "upload-logo") {
    sendAndCreateNewAlbum();
    submitButton.setAttribute('class' ,'submit-2')
  } else if (e.target.id === "music-logo") {
    sendAndCreateNewSong();
    submitButton.setAttribute('class' ,'submit-3')
  } else {
  }
};

function sendAndCreateNewArtist() {
  artistLogo.addEventListener("click", () => {
    centralContainer.style.display = "flex";
    if (document.getElementById("inputArtist").value === "") {
      inputAlbum.style.display = "none";
      inputSong.style.display = "none";
    } else {
      document.getElementById("submit-button").disabled === false;
      inputAlbum.style.display = "flex";
    }
    inputAlbum.style.display = "none";
    inputSong.style.display = "none";
  });
}

function sendAndCreateNewAlbum() {
  uploadLogo.addEventListener("click", () => {
    centralContainer.style.display = "flex";
    inputSong.style.display = "none";
  });
}

function sendAndCreateNewSong() {
  musicLogo.addEventListener("click", () => {
    centralContainer.style.display = "flex";
  });
}
//display functions need update.
//For now display works well, but nothing happend in the back(db, and directories)
function displayArtists(artists) {
  artists.forEach((artist) => {
    const option = document.createElement("option");
    option.value = artist.id;
    let userName = document.createTextNode(artist.name);
    option.appendChild(userName);
    inputArtist.appendChild(option);

  });
}

function displayAlbums(albums) {
  albums.forEach((album) => {
    const option = document.createElement("option");
    option.value = album.id;
    option.setAttribute('name', album.name);
    let title = document.createTextNode(album.name);
    option.appendChild(title);
    inputAlbum.appendChild(option);
    console.log('album.name' + album.name)
 
  });
}

displayArtists(artists);
displayAlbums(albums);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
    if (submitButton.className === 'submit-1') {
        await saveArtist()       
    } else if (submitButton.className === 'submit-2'){
        saveArtist()
        saveAlbum()
    } else if (submitButton.className === 'submit-3'){
        saveArtist()
        saveAlbum()
        saveSong()
    }else {
        alert('error broo')
    }

  
});

inputAlbum.addEventListener('change', ()=>{
    console.log(inputAlbum.value, inputAlbum)
    if(inputAlbum.value === addAlbum){
        inputAlbumText.style.display = "flex"
        console.log('1', inputAlbumText.value)
    } else console.log('mamma', inputAlbum.name)
})

inputArtist.addEventListener('change', ()=>{
    console.log(inputArtist.value)
    if(inputArtist.value == addArtist){
        inputArtistText.style.display="flex";
    }
})


function saveArtist(){
  const name = inputArtistText.value
  if(name!== ""){
    console.log('', name)
    console.log('save artist fonction')

    return postArtist(name)
  }
}
function saveAlbum(){
  const name = inputAlbumText.value
  const artist_id = Number(inputArtist.value)
  console.log(typeof artist_id)
  if(name!== "" && !isNaN(artist_id)){

    return postAlbum(name, artist_id)
  }
  
}
function saveSong() {
  const song = document.getElementById("song");
  const songFiles = song.files;

  for (let i = 0; i < songFiles.length; i++) {
    const songObj = songFiles[i];
    const fd = new FormData(form);
    fd.append("song", songObj);
    const obj = Object.fromEntries(fd);
    const objName = obj.song.name;
    const destinationPath = `/Users/cris/Desktop/Matrice/jukebox/public/uploads/test/${objName}`;

    const json = JSON.stringify(obj);

    versions.fscopy(songObj.path, destinationPath);
    versions.fscopy(songObj.path, destinationPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File copiato con successo");
      }
    });
  }
}
