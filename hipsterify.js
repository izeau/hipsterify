var hipsterify = require('hipsterify');
var sections = document.querySelectorAll("section");
var length = sections.length;
var i, bp;

var parallax = function() {
  bp = "0 " + (-pageYOffset / 10) + "px";
  for (i = 0; i < length; i++) {
    sections[i].style.backgroundPosition = bp;
  }
}

onscroll = function() {
  requestAnimationFrame(parallax);
}

var from = document.getElementById("from");
var to = document.getElementById("to");

from.addEventListener("keyup", function(){
  to.innerText = hipsterify(from.innerText);
});

