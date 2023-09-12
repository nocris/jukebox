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

// [ROMAIN]
// voilà ce que tu fais, quand tu cliques sur un logo (e.g ligne 25+26):
// tu dis que quand tu cliques sur un logo (e.g ligne 40), il faudra faire telle action 
// donc forcément le premier clic ne marche pas. Il suffit que tu fasses tourner tes fonctions
// sendAndCreateNewArtist,sendAndCreateNewAlbum, sendAndCreateNewSong au chargement de ta page
// et tu pourrais même supprimer ensuite les ligne 25 à 37
// Ensuite tu as ton problème d'affichage selon l'ordre dans lequel tu cliques
// notamment parce que tu ne remets pas tes style.display à flex sur tes input
// alors qu'ils ont été mis à none dans les autres catégories 


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
  // [ROMAIN] mais comment ferait-on si on en avait des milliers ?
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

// pouquoi le await sur le premier ou il ne sert à rien
// et pas sur ceux d'après où il pourrait être utile. 
// tu pourrais aussi raccourcir cette boucle qui se répète:
// await saveArtist()       
// if (submitButton.className !== 'submit-1'){
//     await saveAlbum()
// } 
// if (submitButton.className === 'submit-3'){
//     saveSong()
// }
  
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
    // [ROMAIN] pourquoi pas juste console.log(name) ? 
    console.log('save artist fonction')
    // [ROMAIN] supprime tes logs

    return postArtist(name)
  }
}
// [ROMAIN]
// bien mais tu dois aller plus loin ! 
// vide le champ inputArtistText quand l'artiste a été ajouté
// donne un message de validation à ton utilisateur pour qu'il 
// sache que ce qu'il a fait a marché. 
// Aussi, à quoi sert l'upload file à cet endroit-là ? 

function saveAlbum(){
  const name = inputAlbumText.value
  const artist_id = Number(inputArtist.value)
  console.log(typeof artist_id)
  if(name!== "" && !isNaN(artist_id)){
    return postAlbum(name, artist_id)
  }
  
}
// [ROMAIN]
// même remarque 

function saveSong() {
  const song = document.getElementById("song");
  const songFiles = song.files;

  for (let i = 0; i < songFiles.length; i++) {
    // [ROMAIN]
    // pourquoi une boucle ici si tu ne peux uploader qu'un son à la fois ? 
    // d'ailleurs l'input ne devrait pas être "multiple" lorsqu'on ne choisi qu'une chanson. 
    // On peut en uploader plusieurs quand on ajoute un album ? 
    // Comment définit-on leurs noms dans ce cas ? 
    const songObj = songFiles[i];
    const fd = new FormData(form);
    fd.append("song", songObj);
    const obj = Object.fromEntries(fd);
    const objName = obj.song.name;
    const destinationPath = `/Users/cris/Desktop/Matrice/jukebox/public/uploads/test/${objName}`;
    // [ROMAIN]
    // ce code ne peut donc marcher que pour les gens qui s'appellent cris 
    // et qui placent leur Jukebox dans un repo Matrice :O
    const json = JSON.stringify(obj);
    versions.fscopy(songObj.path, destinationPath);
    versions.fscopy(songObj.path, destinationPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File copiato con successo");
      }
    });
    // [ROMAIN]
    // pourquoi utilises-tu deux fois versions.fscopy ? 
  }
}
