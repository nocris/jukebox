const { contextBridge } = require("electron");
const db = require("better-sqlite3")("./resources/jukebox-original.db");
const fs = require("fs");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
 
  // GET REQ
  findAllArtists: () => {
    const rows = db.prepare("SELECT * FROM artists").all();
    console.log("I searched all artists");
    return rows;
  },

  findAllAlbums: () => {
    const rows = db.prepare("SELECT * FROM albums").all();
    console.log("I searched all albums");
    return rows;
  },

  findAllSongs: () => {
    const rows = db.prepare("SELECT * FROM songs").all();
    console.log("I searched all songs");
    return rows;
  },
  findSongsFromAlbumId: (album_id) => {
    const rows = db
      .prepare("SELECT * FROM songs WHERE album_id = " + album_id)
      .all();
      // [ROMAIN] il y avait moyen de passer album_id à all()
      // pour éviter les failles d'injection SQL
    console.log("I searched all songs from album id");
    return rows;
  },
  // POST REQ
  postArtist: (name) => {
    const rows = db.prepare(`INSERT INTO artists (name) VALUES ('${name}')`, (err) =>{
      if (err) throw err;

    }).run()
    // [ROMAIN]
    // même chose pour run, que se passe-t-il si name contient une single quote ? 
    console.log(`I post ${name} into artists table`)
    return rows
  },

  postAlbum: (name, artist_id) => {
    console.log(`I received ${name} with artist_id = ${artist_id} into album table.`)
    const rows = db.prepare (`INSERT INTO albums (name, artist_id) VALUES (?,?)`)
      rows.run(name, artist_id, (err) =>{
    // [ROMAIN] attention aux indentations
    // ici, run est bien utilisé sans faille SQL possible
      if (err) throw err;
    })
    console.log(`I post ${name} with artist_id = ${artist_id} into album table.`)
  },

  //IMPORT FILE TO DESTINATION
  fscopy: (avatarObj, destinationPath) => {
    fs.copyFile(avatarObj, destinationPath, (err) => {
      if (err) throw err;
      console.log("File was copied to destination");
    });
  },

  fsexist: (avatarObj, destinationPath) => {
    fs.copyFile(avatarObj, destinationPath, (err) => {
      if (!folderPath) throw Error("folder path is required");

      const isFolderExist = fs.existsSync(folderPath);
      return isFolderExist;
    });

  }
});
