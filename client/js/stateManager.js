class StateManager {
  constructor(){
    this.state = null;
    this.stateName = null;
    console.log("creating StateManager");
  }

  goTo(state){
    if(null == state || null == state.template || null == state.name ||
       null == state.scripts || null == state.enter || null == state.exit){
      //state to transition to is bad
      return;
    }
    if(this.state != null) this.state.exit();
    this.state = state;

    //load HTML into index div mainContent
    var htmlTemplate = new XMLHttpRequest();
    htmlTemplate.onreadystatechange = function() {
        if (htmlTemplate.readyState == 4 && htmlTemplate.status == 200) {
            document.getElementById('mainContent').innerHTML = htmlTemplate.responseText;
        }
    }
    htmlTemplate.open("GET", state.template, true);
    htmlTemplate.send();

    //load javascript scripts
    this.state.scripts.forEach(function(file){
        let script = document.createElement('script');
        script.onload = function () {
            console.log("%s loading script %s", this.state.name, file);
        }.bind(this);
        script.src = file;
        script.setAttribute('defer', '');
        document.head.appendChild(script);
    }.bind(this));

    this.state.enter();

}//goTo state

}//end StateManager class def

var gameState = {
  template: "../html/game.html",
  scripts: ["../js/assets/button.js",
            "../shared/EnergyNode.js",
            "../js/input.js",
            "../js/render.js",
            "../js/gameStateManager.js",
            "../js/game.js"],
  name: "gameState",
  enter: ()=>{console.log("Entering state gameState");},
  exit: ()=>{console.log("Leaving state gameState");}
}

var loginState = {
  template: "../html/login.html",
  scripts: ["../js/login.js"],
  name: "loginState",
  enter: ()=>{console.log("Entering state loginState");},
  exit: ()=>{console.log("Leaving state loginState");}
}
