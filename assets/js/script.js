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
        console.log(res2)
        if(res2.ok === false){
            titleContent.textContent= "We Could Not Fetch a Movie with that Sub-Genre, Please Try Again.";
            contentLander.appendChild(titleContent);
            console.log("hello")
        }
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
            if(poster.Response == "False"){
                console.log("hello")
                var imgEl = "./assets/imgs/NoPoster.png"
            }
            else{var imgEl= poster.Poster}
            var contentGenerator = function() {
            console.log(imgEl)
            
            var posterItem = document.createElement("img");
            posterItem.src = imgEl;
            posterItem.classList.add("w-64")
            titleContent.textContent = (movieTitle);
            contentLander.appendChild(titleContent);
            contentLander.appendChild(posterItem);
            }
            contentGenerator();
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
//Name Collecter
/** ----------------------------------------------------------------*/
var modalEl = document.getElementById("modal")
var userNameEl = document.getElementById("userName")
var headerEl = document.getElementById("header")
console.log(headerEl)
var savedName = localStorage.getItem("User")? localStorage.getItem("User"): "";
var viewModal = function(){
    if(savedName ==""){
        modalEl.setAttribute("style", "display:flex")
    }
    else{
        var greeting = document.createElement("H1")
        greeting.innerText= "Hello, "+ savedName
        headerEl.appendChild(greeting)
    }
}
viewModal();
userNameEl.addEventListener("submit", function(event){
    event.preventDefault();
    var name = event.target.children[0].value;
    localStorage.setItem("User", name);
    
    modalEl.setAttribute("style", "display:none")
    var greeting = document.createElement("H1")
    greeting.innerText= "Hello, "+ name + " click the button below to find a random movie!"
    console.log(greeting)
    headerEl.appendChild(greeting)

})
/*----------------------------------------------------------------*/
// div id="modal">
//         <form id="userName">
//             <input placeholder="First Name"/>
//             <button type="submit">Submit</button>
//         </form>