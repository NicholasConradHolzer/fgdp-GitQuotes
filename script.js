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
    })
    .catch(function (err) {
        console.error(err);
    });
};


callAPI();