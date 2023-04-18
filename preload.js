const { contextBridge } = require('electron')
const db = require('better-sqlite3')('./resources/jukebox.db');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  findAllArtists: () => {
    const rows = db.prepare("SELECT * FROM artists").all()
    console.log("I searched all artists")
    return rows
  },

  findAllAlbums: () => {
    const rows = db.prepare("SELECT * FROM albums").all()
    console.log("I searched all albums")
    return rows
  },

  findAllSongs: () => {
    const rows = db.prepare("SELECT * FROM songs").all()
    console.log("I searched all songs")
    return rows
  },
  findSongsFromAlbumId: (album_id) => {
    const rows = db.prepare("SELECT * FROM songs WHERE album_id = " + album_id).all()
    console.log("I searched all songs from album id")
    return rows
  },
})