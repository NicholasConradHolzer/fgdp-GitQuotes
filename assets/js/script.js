var apiKey = "4a28d039438d8964f8454bc9ec5e51f1";
var apiPoster= "https://www.omdbapi.com/?apikey=c1be519f&t=";
var genreEl = document.getElementById("Genre");
var subGenreEl = document.getElementById("Subgenre");
var clickbtn = document.getElementById("randmovie");

var parameters = function (event){
    var genreSelected = genreEl.options[genreEl.selectedIndex].value;
    var subGenreSelected = ("," + subGenreEl.options[subGenreEl.selectedIndex].value);
    var contentLander= document.getElementById("contentLander")
    contentLander.innerHTML="";
    document.getElementById("randmovie").disabled = true;
    document.getElementById("randmovie").style.opacity="0.5";
    var titleContent = document.createElement("a");
    titleContent.classList.add("carderizer")
    titleContent.classList.add("cardborder")
    titleContent.classList.add("titlesend")
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
        // call api again with that info
        fetch(apiGenreURL)
    .then(function(res2) {
        // Error Handling
        if(res2.ok === false){
            titleContent.innerHTML = "<p>We Could Not Fetch a Movie with that Sub-Genre, <a id='nofindreset' href='index.html'>Please Try Again.</a></p>";
            contentLander.appendChild(titleContent);
            console.log("hello")
        }
        return res2.json();
    })
    .then(function (conciseData){
        // construct url for api call with specific movie title
        var movie = conciseData.results[randomResultfromPage]
        var MovieId= movie.id
        var movieTitle= movie.title
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
            console.log(poster)
            if(poster.Response == "False"){
                console.log("hello")
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
    
    console.log(genreSelected)
    console.log(subGenreSelected);
}

clickbtn.addEventListener("click", parameters);


// var historyBar = document.getElementById("historybar");
// var historyArray = JSON.parse(localStorage.getItem("History")) || [];
// console.log(historyArray);
// var randHistory = function(rand) {
//     if(historyArray.indexOf(rand)<0) {
//     historyArray.push(rand)
//     localStorage.setItem("History", JSON.stringify(historyArray))
//     historyLinks();
// };
// }

// var historyLinks = function() {
//     historyBar.innerHTML = "";
//     historyArray.forEach(rand => {
//         var oldLink = document.createElement("a");
//         oldLink.className = "(PLACEHOLDER)"
//         oldLink.id=rand;
//         oldLink.innerText=rand;
//         oldLink.addEventListener("click", function(event){
//             var cinema = event.target.id;
//             parameters(cinema);
//         })
//         historyBar.appendChild(oldLink);
//     })
// }
// historyLinks();
//Name Collecter
/** ----------------------------------------------------------------*/
var titleEl = document.getElementById("usertitle")
console.log(titleEl.innerHTML);
var modalEl = document.getElementById("modal")
var userNameEl = document.getElementById("userName")
var headerEl = document.getElementById("header")
console.log(headerEl)
var savedName = localStorage.getItem("User")? localStorage.getItem("User"): "";
console.log(savedName);
// Grab User input for personalization
var viewModal = function(){
    // Check to see if user has visited site before, and prompt for name if first time
    if(savedName ==""){
        modalEl.setAttribute("style", "display:flex")
    }
    else{
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
    //var greeting = document.createElement("H1")
   // greeting.innerText= "Hello, "+ name + " click the button below to find a random movie!"
    //console.log(greeting)
   // headerEl.appendChild(greeting)

})
//<section class="my-10 -mx-15">
 //       <h1 class="text-gray-200 text-6xl text-center carderizer cardborder">MovieFetch</h1>
   //     <br>
  //      <!-- <p class=" text-gray-200 text-center text-lg" id="byegreeter">Discover something new and amazing to watch.</p> -->
//</section>

