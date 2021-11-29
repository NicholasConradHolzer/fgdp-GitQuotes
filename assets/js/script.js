var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&t=";
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
var clickbtn = document.getElementById("randmovie");

var parameters = function (event){
    var genreSelected = genreEl.options[genreEl.selectedIndex].value;
    var subGenreSelected = ("," + subGenreEl.options[subGenreEl.selectedIndex].value);
    var contentLander= document.getElementById("contentLander")
    //removes previous generated movie before adding next movie
    contentLander.innerHTML="";
    //14, 15: disables the click until a random movie has generated to avoid double loading random movies (reverts with lines: 101, 102)
    document.getElementById("randmovie").disabled = true;
    document.getElementById("randmovie").style.opacity="0.5";
    //18: Adds a title element that can be made into a link to TMDB's description of the movie; including poster, trailer links, and places the movie can be viewed.
    //link is generated on lines: 73, 74, 75
    var titleContent = document.createElement("a");
    titleContent.classList.add("carderizer")
    titleContent.classList.add("cardborder")
    titleContent.classList.add("titlesend")
    //genres are found through genre id's; used as our value in our select tag options
    parseInt(genreSelected , subGenreSelected);
    if (subGenreSelected===0) {
        var subGenreSelected = ""
    }
    var apiGenreURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + 
    "&language=en&with_genres=" + genreSelected + subGenreSelected;
    event.preventDefault();
    // Initial api call to find ALL movies of selected genres
    fetch(apiGenreURL)
    .then(function(res) {
    return res.json();
    })
    .then(function (data){
        var resultsParam= data.total_results
        // Use resultsParam to randomly select a movie
        var randomResult= Math.floor(Math.random()*resultsParam);
        // Max results per page = 20
        // we will want to divide resultsParam by 20( example 35/20= 1.75),
        //  drop the decimal values, then add 1 to get the page number
        var RandomResultsPage= Math.ceil(randomResult/20)
        // once we have a page number, we want to randomly select a number 1-20,
        //  subtract 1, (or randInt 0-19) to get a random title
        var randomResultfromPage= Math.floor(Math.random()*20)
        // Take random page, add it to api search/call with random 
        // movie position in array
        var apiGenreURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + 
        "&language=en&with_genres=" + genreSelected + subGenreSelected +"&page=" +RandomResultsPage;
        // call api again with that info
        fetch(apiGenreURL)
    .then(function(res2) {
        // Error Handling
        if(res2.ok === false){
            //61: provides link back to homepage to reset selectables conveniently
            titleContent.innerHTML = "<p>We Could Not Fetch a Movie with that Sub-Genre, <a id='nofindreset' href='index.html'>Please Try Again.</a></p>";
            contentLander.appendChild(titleContent);
        }
        return res2.json();
    })
    .then(function (conciseData){
        // construct url for api call with specific movie title
        var movie = conciseData.results[randomResultfromPage]
        var MovieId= movie.id
        var movieTitle= movie.title
        //73, 74, 75: this is where the link is applied to the anchor tag on line: 18
        var linkify = "https://www.themoviedb.org/movie/" + MovieId + "-" + movieTitle + "?language=en-US"
        titleContent.target = '_blank'
        titleContent.href = linkify
        var poster=apiPoster+movieTitle
        // get title from second api call, pass it through second api (omdb) 
        // to get poster
        fetch(poster)
        .then(function(res3){
            return res3.json();
        })
        .then(function(poster){
            if(poster.Response == "False"){
                var imgEl = "./assets/imgs/NoPoster.png"
            }
            else{var imgEl= poster.Poster}
            // Show the movie info
            var contentGenerator = function() {
            var posterItem = document.createElement("img");
            posterItem.src = imgEl;
            posterItem.classList.add("w-64")
            titleContent.textContent = (movieTitle);
            contentLander.appendChild(titleContent);
            contentLander.appendChild(posterItem);
            }
            contentGenerator();
            //101, 102: undoes second click disable as per lines: 14, 15
            document.getElementById("randmovie").disabled = false;
            document.getElementById("randmovie").style.opacity="1";
        })
        // Populate title, tagline (mayber other info?) from first api, populate
        //  poster with second api.
        // 

    })
    .catch(function (err) {
        console.error(err);
    });
    })
    .catch(function (err) {
        console.error(err);
    })
    
}

clickbtn.addEventListener("click", parameters);



//Name Collecter
/** ----------------------------------------------------------------*/
var titleEl = document.getElementById("usertitle")
var modalEl = document.getElementById("modal")
var userNameEl = document.getElementById("userName")
var headerEl = document.getElementById("header")
var savedName = localStorage.getItem("User")? localStorage.getItem("User"): "";
// Grab User input for personalization
var viewModal = function(){
    // Check to see if user has visited site before, and prompt for name if first time
    if(savedName ==""){
        modalEl.setAttribute("style", "display:flex")
    }
    else{
       // var greeting = document.createElement("H1")
       //add savedName to the title
        titleEl.textContent = "MovieFetch for " + savedName;
    }
}
viewModal();
userNameEl.addEventListener("submit", function(event){
    event.preventDefault();
    var name = event.target.children[0].value;
    // Error Handling if button is clicked without providing name
    if(name == "" || name ==="null") {
        var nameSlot = document.getElementById("nameslot")
        nameSlot.placeholder="Name Must be Submitted"
        return;
    }
    localStorage.setItem("User", name);
    
    modalEl.setAttribute("style", "display:none")
    titleEl.textContent = "MovieFetch for " + name;

})


