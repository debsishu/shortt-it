// this optimizes the website load time
if (document.readyState === 'ready' || document.readyState === 'complete') {
  document.getElementById("hero-img-change").src = "./images/Hero-Gif.gif";
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      document.getElementById("hero-img-change").src = "./images/Hero-Gif.gif";
    }
  }
}


//this is the function to reset the input text everytime we refresh the page
window.onload = function () {
  document.querySelector('.input-bar').value = ''
}

var link1 = false;
var link2 = false;

function shortenIt() {
  //selecting the input text from the HTML file
  var x = document.getElementById("link-url").elements[0].value;

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (x.match(regex)) {

    const api = "https://api.shrtco.de/v2/shorten?url=";

    const url = api + x;
    var newUrl = "";

    const loader = document.querySelector(".loading");
    loader.style.display = "block";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        newUrl = data.result.full_short_link;
        loader.style.display = "none";
        var chopped = x.slice(0, 60);
        console.log(newUrl);
        if (!link1 && !link2) {
          document.getElementById("short-link-1").style.display = 'block';
          var topLink = document.querySelector(".top-link-1");
          var bottomLink = document.querySelector(".bottom-link-1");
          topLink.href = x;
          topLink.innerText = chopped;
          bottomLink.href = newUrl;
          bottomLink.innerText = newUrl;
          link1 = true;
        } else if (link1 && !link2) {
          document.getElementById("short-link-2").style.display = 'block';
          var topLink = document.querySelector(".top-link-2");
          var bottomLink = document.querySelector(".bottom-link-2");
          topLink.href = x;
          topLink.innerText = chopped;
          bottomLink.href = newUrl;
          bottomLink.innerText = newUrl;
          link2 = true;
        } else if (link1 && link2) {
          document.getElementById("short-link-1").style.display = 'block';
          var topLink = document.querySelector(".top-link-1");
          var bottomLink = document.querySelector(".bottom-link-1");
          topLink.href = x;
          topLink.innerText = chopped;
          bottomLink.href = newUrl;
          bottomLink.innerText = newUrl;
          link2 = false;
        }
      })

  } else {
    alert("Not a valid URL");
    document.querySelector(".input-bar").focus();
  }

  return false;

}

function copyText(link) {
  var shortLink = document.querySelector("." + link).href;
  var tempText = document.createElement('textarea');
  tempText.value = shortLink;
  document.body.appendChild(tempText);
  tempText.select();
  document.execCommand('copy');
  document.body.removeChild(tempText);
  alert("Link copied to clipboard");
}