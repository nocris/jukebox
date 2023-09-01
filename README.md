How to play

Info: 
nvm --version = 0.39.3 
node -v = 15.14.0
npm -v = 7.7.6


Let's play some good shit bro':
nvm use 16
yarn install 
yarn rebuild 
yarn start

Figma maquette: 
https://www.figma.com/file/4OKJd1JnfwkCsQyiiecmB9/jukebox?type=design&node-id=0-1


Tecnologie:

Html/CSS/JavaScript
Electron
better-sqlite3


HELLO MATE! 
This is my Jukebox! 
You can select your favorite album and listen to it in complete serenity.

To add new music, you need to access the admin page:
From the homepage, type "casu marzu," and voilà, you're on the admin page where you can add new artists, new albums, and new songs.

You can find the mockup and the original UML Schema in the 'assets/Docs' folder of the project.

Planned features in the next version:

- CSS styling for the homepage
- Search bar to find our favorite albums
- Database update (New UML Schema)
- End-to-end testing of the admin page"
- Add the input choice for artists and albums if new
- Bug notice in admin page: 
    If I click in new song button => new album => new artist --- OK
    If I click in new artist => new album => new song button --- Doesn't work
- Change the path of album doing something like this: 
    public/upload/artist/albums/songs (not really needed)