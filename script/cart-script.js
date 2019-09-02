
var $ = id => document.getElementById(id);

window.onload = function () {
  
  $('username').innerHTML = localStorage.getItem('name').substr(localStorage.getItem('name').indexOf(' ')+1);
  $('continueShop').onclick = function(event) {
    location.reload();
  }
  
}

$('btnLogout').onclick = function(event) {
  event.preventDefault();
  window.close();
  window.open("index.html");
}