const { contextBridge } = require('electron')
const db = require('better-sqlite3')('./resources/jukebox.db');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  findAllSongs: () => {
    const rows = db.prepare("SELECT * FROM songs").all()
    console.log("I searched all songs")
    return rows
  },
})