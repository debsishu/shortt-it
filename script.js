//this is the function to reset the input text everytime we refresh the page
window.onload = function () {
  document.querySelector('.input-bar').value = ''
}


function shortenIt() {
  //selecting the input text from the HTML file
  var x = document.getElementById("link-url").elements[0].value;

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (x.match(regex)) {

    const api = "https://api.shrtco.de/v2/shorten?url=";

    //on api calls it will show loading animation
    var load = document.querySelector(".loading-ani");
    load.style.display = 'block';
    var links = document.querySelector(".links");

    const url = api + x;
    var newUrl = "";

    //does a fetch request on the api
    fetch(url)
      .then(res => res.json())
      .then(data => {
        load.style.display = 'none';
        newUrl = data.result.full_short_link;
        console.log(newUrl);
        var oldUrl = x.slice(0, 60);
        links.style.display = 'flex';
        document.getElementById("short-url").href = newUrl;
        document.getElementById("short-url").innerText = oldUrl;
      })

  } else {
    alert("Not valid url");
    document.querySelector(".input-bar").focus();
  }


}

function copyLink() {
  var shortLink = document.getElementById("short-url").href;
  var tempText = document.createElement('textarea');
  tempText.value = shortLink;
  document.body.appendChild(tempText);
  tempText.select();
  document.execCommand('copy');
  document.body.removeChild(tempText);
  var buttonText = document.querySelector(".button");
  buttonText.innerText = "Link Copied";
  buttonText.style.backgroundColor = "#ff8949";
}


