# liri-node-app

## Liri Bot Assignment

LIRI is a Language Interpretation and Recognition Interface.  LIRI will be a command line node app that takes in parameters and gives you back data. 

## Technologies 
JavaScript, Node.js, Request library, Spotify API, dateFormat library, File system library.

## How to Use Liri 
![images](https://github.com/natsolis/liri-node-app/blob/master/images%20/Screen%20Shot%202019-10-26%20at%203.09.30%20PM.png?raw=true)

#`concert-this`

`node liri.js concert-this <artist or band name>`

 This will search the Bands in Town Artist Events API for an artist and show the following information about each event in the terminal and to the random.txt file:

  ```
      * Name of the venue
      * Venue location
      * Date of the Event 
    ```
![images](https://github.com/natsolis/liri-node-app/blob/master/images%20/Screen%20Shot%202019-10-26%20at%203.12.12%20PM.png?raw=true)

#`spotify-this-song` 

`node liri.js spotify-this-song '<song name>'`

Will search the Spotify API for a song and show the following information about the song in the `terminal` and to the `random.txt` file:

 ```
      * Artist(s)
      * The song's name
      * A preview link of the song from Spotify
      * The album that the song is from
    ```

    #movie-this
   
   `node liri.js movie-this '<movie name here>'`

   




