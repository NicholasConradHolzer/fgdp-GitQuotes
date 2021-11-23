var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&";
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
var clickbtn = document.getElementById("randmovie");

var parameters = function (){
    var genreSelected = genreEl.options[genreEl.selectedIndex].value;
    var subGenreSelected = ("," + subGenreEl.options[subGenreEl.selectedIndex].value);
    parseInt(genreSelected , subGenreSelected);
    if (subGenreSelected===0) {
        var subGenreSelected = ""
    }
    var apiGenreURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + 
    "&with_genres=" + genreSelected + subGenreSelected;

    console.log(genreSelected)
    console.log(subGenreSelected);
}

clickbtn.addEventListener("click", parameters);