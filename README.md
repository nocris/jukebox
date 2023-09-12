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


[ROMAIN] Je mets ici mes remarques générales 

*design*

top que tu aies fait les wireframes !

après il y a des problèmes de marge par exemple entre les noms d'albums,

des éléments qui flottent un peu trop et qui devrait être un peu mieux caller
type noms d'albums vs nom d'artistes. Bizarre aussi d'avoir des mélanges 
alignés à gauche / centrés.

Mets des cursor:pointer sur tes éléments cliquables, c'est une bonne pratique. 

La page qui montrent les sons d'un album est à revoir:
Beaucoup trop de marge sous le nom de l'artiste : 
On affiche que 3 chansons à la fois à l'écran.

Quand tu scrolles jusqu'en bas tu ne vois pas dernière chanson, 
cachée par le player.

quand tu resize ta fenêtre, le player a un mauvais display.

une erreur quand tu cliques sur les flèches avant de sélectionner une chanson. 

rien qui t'indique visuellement quelle chanson joue. 

*Le reste*

Des bonnes choses et un jukebox qui fonctionne plus ou moins ! Mais il manque encore trop de features par rapport à ce qui était attendu (search, double album, player custom, player persistant...) et il reste des bugs dans ce qui a été fait. Le gros de l'archi est à revoir pour utiliser better-sqlite et le preload à bon escient. 
