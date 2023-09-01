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

Updates:

- CHANGE DATABASE STRUCTURE

- Create new directory

- Add the input choice for artists and albums if new (how?)
    I could add a 4th option that on click make visible a div with input and on submit the value could be passed to the select.

- Bug notice in admin page: 
    If I click in new song button => new album => new artist --- OK
    If I click in new artist => new album => new song button --- Doesn't work

- Change the path of album doing something like this: 
    public/upload/artist/albums/songs (not really needed)