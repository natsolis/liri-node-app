// require .env file
require("dotenv").config();
// require request 
var request = require("request");
// require moment
var moment = require("moment");
// require file systems
var fs = require("fs");
// require the key.js file 
var keys = require("./keys.js");

// // npm package 
// var axios = require("axios")

// var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// ombi and bands-in-town api's 
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

// take user's command
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

// Step concert: Create func that 
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("LIRI doesn't know that");
            break;
    }
}
userCommand(userInput, userQuery);

//  function for concert-this
function concertThis() {
    console.log(`\n- - - - -\n\n SEARCHING FOR...${userQuery}'s next show...`);
    // use request as our query url using our user query var as the parameters of our search
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, function (error, response, body) {
        // if there is no error give us a 200 status code (all is well)
        if (!error && response.statusCode === 200) {
            var userBand = JSON.parse(body);
            // parse data and use it for the for loop to access the paths to data
            if (userBand.length > 0) {
                for (var i = 0; i < 1; i++) {

                    // console log data using syntax
                    console.log(`\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i]
                        .venue.name}\nVenue Location: ${userBand[i].venue.country}`)

                    // moment.js format mm/dd/yyyy
                    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate} \n\n- - - - -`);

                };
            } else {
                console.log(' Band or concert can not be found');
            };
        };
    });
}

function spotifyThisSong() {
    console.log(`\n - - - - - \n\nSEARCHING FOR..."${userQuery}"`);

    // if user query not found
    if (!userQuery) { userQuery = "california love by tupac" };
    //spotify search query format 
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occured : ' + error);
        }
        // collect and selected data in an array
        var spotifyArray = data.tracks.items;
        for (var i = 0; i < spotifyArray.length; i++) {
            console.log(`\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong:
          ${data.tracks.item[i].name} \nSpotify link: ${data.tracks.item[i].external_urls.spotify} \nAlbums:
          ${data.tracks.item[i].album.name}\n\n - - - - -`)
        };
    });
}

function movieThis() {
    console.log(`\n- - - - - \n\n SEARCHING FOR..."${userQuery}"`);
    if (!userQuery) { userQuery = "mr nobody "; };
    // request using omdb api 
    request("http://www.ombdapi.com/?t=" + userQuery + "&apikey=72b35781", function (error, response, body) {
      
    // rotten tomatoes rating nested 
      let ratingsArr = userMovie.Ratings;
      if (ratingsArr.length > 2) {}

      if (!error && response.statusCode === 200) {
          console.log(`\nBA DA BOP!  That's for you...\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
      } else {
          return console.log("Movie able to be found. Error:" + error)
      };
  })
};

function doThis() {
    // access the random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // methond will seaparate objects within new array
        let dataArr = data.split(",");

        //  take objects from random.txt to pass parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // calling all function jk (just new parameters)
        userCommand(userInput, userQuery);
    });
};

   
    