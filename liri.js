// require .env file
require("dotenv").config();
// require the key.js file 
var keys = require("./keys.js");
// require request 
var request = require("request");
// var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
// require moment
var dateFormat = require("dateFormat");
// require file systems
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// // npm package 
// var axios = require("axios")



// take user's command



//  function for concert-this
var concertThis = function(artist){
    var region = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
    //console.log(queryUrl);
    
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Save parsed body in a new variable for easier use
            var concertInfo = JSON.parse(body)
            
            console.log(artist + " concert information:")

            for (i=0; i < concertInfo.length; i++) {
                
                region = concertInfo[i].venue.region
                
                if (region === "") {
                    region = concertInfo[i].venue.country
                }

                // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
                console.log("Venue: " + concertInfo[i].venue.name)
                console.log("Location: " + concertInfo[i].venue.city + ", " + region);
                console.log("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"))
            }
        }
    })
}

           
        
// function for Spotifyvar spotifyThisSong = function(song){
var spotifyThisSong = function(song){
// Default should be "The Sign" by Ace of Base
    if (!song){
        song = "the sign"
    }

    //var spotify = new Spotify(keys.spotify);

    spotify.search({type: "track", query: song}, function (err, data){
        if (err) {
            return console.log(err)
        }

        // Need to return Artist(s), Song Name, Album, Preview link of song from Spotify
        var songInfo = data.tracks.items[0]
       console.log("Artist Name: " + songInfo.artists[0].name);
        console.log("Song Name : " + songInfo.name);
        console.log("Album Name : " + songInfo.album.name);
        console.log("Song URL : " + songInfo.preview_url);
    })
}

// function for Movies 
var movieThis = function(movie){
    // Default should be "Beauty and the Beast"
    if (!movie){
        movie = "Beauty and the Beast"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);

    // Then create a request to the queryUrl
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Need to return: Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country, 
            // Language, Plot, Actors
            var movieInfo = JSON.parse(body)

            console.log("Title: " + movieInfo.Title)
            console.log("Release year: " + movieInfo.Year)
            console.log("IMDB Rating: " + movieInfo.imdbRating)
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value)
            console.log("Country: " + movieInfo.Country)
            console.log("Language: " + movieInfo.Language)
            console.log("Plot: " + movieInfo.Plot)
            console.log("Actors: " + movieInfo.Actors)
        }
    })
}

function doWhatItSays() {
    // access the random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // methond will seaparate objects within new array
        var dataArr = data.split(",");

        //  take objects from random.txt to pass parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // calling all function jk (just new parameters)
        Commands(userInput, userQuery);
    });
};


var Commands = function(func, parm) {
    switch (func) {
        case "concert-this":
            concertThis(parm);
            break;
        case "spotify-this-song":
            spotifyThisSong(parm);
            break;
        case "movie-this":
            movieThis(parm);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            outputData("I don't recognize that command, please try again.") 
    }
}

Commands(process.argv[2], process.argv[3])

   
    