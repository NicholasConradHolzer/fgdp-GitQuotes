var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&";
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
var clickbtn = document.getElementById("randmovie");

var parameters = function (event){
    var genreSelected = genreEl.options[genreEl.selectedIndex].value;
    var subGenreSelected = ("," + subGenreEl.options[subGenreEl.selectedIndex].value);
    parseInt(genreSelected , subGenreSelected);
    if (subGenreSelected===0) {
        var subGenreSelected = ""
    }
    var apiGenreURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + 
    "&with_genres=" + genreSelected + subGenreSelected;
    event.preventDefault();
    fetch(apiGenreURL)
    .then(function(res) {
    return res.json();
    })
    .then(function (data){
        console.log(data);
        var resultsParam= data.total_results
        console.log(resultsParam);
        // Use resultsParam to randomly select a movie
        // Max results per page = 20
        // we will want to divide resultsParam by 20( example 35/20= 1.75), drop the decimal values, then add 1 to get the page number
        // once we have a page number, we want to randomly select a number 1-20, subtract 1, (or randInt 0-19) to get a random title
        // Take random page, add it to api search/call with random movie position in array
        // call api again with that info
        // get title from second api call, pass it through second api (omdb) to get poster
        // Populate title, tagline (mayber other info?) from first api, populate poster with second api.
    })
    .catch(function (err) {
        console.error(err);
    })
    console.log(genreSelected)
    console.log(subGenreSelected);
}

clickbtn.addEventListener("click", parameters);
