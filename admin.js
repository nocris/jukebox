//Function that on button click resend to the right page (Artist || Album || Song
// import * as fs from './preload';
const fs = versions.fs;

const artists = versions.findAllArtists();
const albums = versions.findAllAlbums();

const centralContainer = document.getElementById('central-container'); 
const submitButton = document.getElementById('submit-button');
const artistLogo = document.getElementById('artist-logo');
const uploadLogo = document.getElementById('upload-logo');
const musicLogo = document.getElementById('music-logo');
const inputArtist = document.getElementById('inputArtist');
const inputAlbum = document.getElementById('inputAlbum');
const inputSong = document.getElementById('inputSong');
const form = document.getElementById('form');
const pathTest = "./test"

window.onclick = e => {
    if (e.target.id === "artist-logo") {
        sendAndCreateNewArtist()       
    } else if (e.target.id === "upload-logo"){
        sendAndCreateNewAlbum()
    } else if (e.target.id === "music-logo"){
        sendAndCreateNewSong()
    } else{
    }
}

function sendAndCreateNewArtist(){
    artistLogo.addEventListener('click', () => {
        centralContainer.style.display = 'flex'
        if(document.getElementById('inputArtist').value === ""){
            inputAlbum.style.display='none'
            inputSong.style.display='none'
            document.getElementById('submit-button').disabled === true;
        } else{
            document.getElementById('submit-button').disabled === false;
            inputAlbum.style.display='flex'
        }
        inputAlbum.style.display='none'
        inputSong.style.display='none'
    })    
    
}

function sendAndCreateNewAlbum(){
    uploadLogo.addEventListener('click', () => {
        centralContainer.style.display='flex'
        inputSong.style.display='none'
    })
}

function sendAndCreateNewSong(){
    musicLogo.addEventListener('click', () => {
        centralContainer.style.display='flex'
    })
}
function displayArtists(artists){
    artists.forEach(artist => {
        const option = document.createElement('option')
        console.log('name' + artist.name)
        option.value = artist.id
        let userName=document.createTextNode(artist.name);
        option.appendChild(userName)
        inputArtist.appendChild(option)
    });
}

function displayAlbums(albums){
    albums.forEach(album => {
        const option = document.createElement('option')
        console.log('name' + album.name)
        option.value = album.id
        let title = document.createTextNode(album.name);
        option.appendChild(title)
        inputAlbum.appendChild(option)
    });
}


displayArtists(artists)
displayAlbums(albums)




 form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const avatar = document.getElementById('avatar');
    const avatarObj = avatar.files[0].path;
    const fd = new FormData(form)
    const obj = Object.fromEntries(fd)
    const objName = obj.avatar.name
    const destinationPath = `/Users/cris/Desktop/Matrice/jukebox/public/${objName}`
    

    const json = JSON.stringify(obj);
    // localStorage.setItem('form', json)
    console.log(avatarObj)
    console.log(obj.avatar.name)


    versions.fscopy(avatarObj, destinationPath)

 })
