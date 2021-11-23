var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&";
var apiGenreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=4a28d039438d8964f8454bc9ec5e51f1&language=en-US`;
// var apiTemp= ;
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
// var timeEl= document.getElementById("Timelimit")
var clickbtn = document.querySelector("#randmovie");

var parameters = function (){
    var genreSelected = genreEl.options[genreEl.selectedIndex].val;
    var subGenreSelected = subGenreEl.options[subGenreEl.selectedIndex].text;
    // var timeLimit= timeEl.options[timeEl.selectedIndex].text
    console.log(genreSelected)
    console.log(subGenreSelected);
    // console.log(timeLimit);
}

clickbtn.addEventListener("click", parameters);