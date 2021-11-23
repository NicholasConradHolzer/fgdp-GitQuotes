var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&";
// var apiURL = ;
// var apiTemp= ;
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
// var timeEl= document.getElementById("Timelimit")


function parameters(){
    var genreSelected = genreEl.options[genreEl.selectedIndex].value;
    var subGenreSelected = subGenreEl.options[subGenreEl.selectedIndex].value;
    // var timeLimit= timeEl.options[timeEl.selectedIndex].text
    console.log(genreSelected)
    console.log(subGenreSelected);
    // console.log(timeLimit);
}
