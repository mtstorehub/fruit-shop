var $$ = id => document.getElementById(id);

$('.message a#btnSignin').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('.message a#btnSignup').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$$('btnCreate').onclick = function(event) {
   var name = $$("newName").value;
   var password = $$("newPsw").value;
   var email = $$("newEmail").value;
   if(!/Mg|Ma\s[A-Z a-z]{2,}/.test(name)){
      alert("Your name must be Mg or Ma");
      $("newName").focus();
      return;
   }
   if(password.length <= 5) {
      alert("Your password's length must be greater then five")
      $("newPsw").focus();
      return;
   }
   if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
      alert("email format invalid")
      $("newEmail").focus();
      return;
   }
   localStorage.setItem("name", name)
   localStorage.setItem("psw",password)
   alert("Successful Register!");
   $('.message a#btnSignin').click();
}

$$("btnLogin").onclick = function(event) {
   var loginName = $$("loginName").value;   
   var loginPassword = $$("loginPsw").value;
   if(localStorage.getItem('name')==loginName && localStorage.getItem('psw') == loginPassword){
      alert("login successful!");
      setTimeout(()=> {window.close()}, 1000);
      window.open("cart.html")
   }
   else {
      alert("username and password does not match!");
   }
   
}