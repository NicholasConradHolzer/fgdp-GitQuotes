var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&t=";
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
    "&language=en&with_genres=" + genreSelected + subGenreSelected;
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
        var randomResult= Math.floor(Math.random()*resultsParam);
        console.log(randomResult)
        // Max results per page = 20
        // we will want to divide resultsParam by 20( example 35/20= 1.75),
        //  drop the decimal values, then add 1 to get the page number
        var RandomResultsPage= Math.ceil(randomResult/20)
        console.log(RandomResultsPage)
        // once we have a page number, we want to randomly select a number 1-20,
        //  subtract 1, (or randInt 0-19) to get a random title
        var randomResultfromPage= Math.floor(Math.random()*20)
        console.log(randomResultfromPage)
        // Take random page, add it to api search/call with random 
        // movie position in array
        var apiGenreURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + 
        "&language=en&with_genres=" + genreSelected + subGenreSelected +"&page=" +RandomResultsPage;
        console.log(apiGenreURL);
        // call api again with that info
        fetch(apiGenreURL)
    .then(function(res2) {
        return res2.json();
    })
    .then(function (conciseData){
        console.log(conciseData.results[randomResultfromPage])
        var movie = conciseData.results[randomResultfromPage]
        var movieTitle= movie.title
        console.log(movieTitle)
        var poster=apiPoster+movieTitle
        console.log(poster)
        // get title from second api call, pass it through second api (omdb) 
        // to get poster
        fetch(poster)
        .then(function(res3){
        return res3.json();
        })
        .then(function(poster){
            console.log(poster)
            var imgEl= poster.Poster
            console.log(imgEl)
        })
        // Populate title, tagline (mayber other info?) from first api, populate
        //  poster with second api.
    })
    .catch(function (err) {
        console.error(err);
    });
    })
    .catch(function (err) {
        console.error(err);
    })
    
    console.log(genreSelected)
    console.log(subGenreSelected);
}

clickbtn.addEventListener("click", parameters);
