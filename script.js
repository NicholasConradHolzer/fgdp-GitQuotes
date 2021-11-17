var apiKey = ;
var apiURL = ;
var apiTemp= ;
var getBtn = document.querySelector(getBtn);
var displayBox = document.querySelector(displayBox);
var quoteDisp = document.querySelector(quoteDisp);
var pictureDisp = document.querySelector(pictureDisp);
var videoDisp = document.querySelector(videoDisp);



function callAPI() {
    fetch(apiURL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    
    // var h1El= document.createElement('h1');
    // h1El.setAttribute("class", "h1El");
    // h1El.textContent = bob.name;
    // dynamic.appendChild(h1El);

    // h2El.textContent = "Temp: " + bob.main.temp + " degrees F";
    // dynamic.appendChild(h2El);

    })
    .catch(function (err) {
        console.error(err);
    });
};


callAPI();