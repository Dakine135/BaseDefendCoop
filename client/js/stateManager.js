class StateManager {
  constructor(){
    this.state = null;
    this.stateName = null;
    console.log("creating StateManager");
  }

  goTo(state){
    if(null == state || null == state.template || null == state.name){
      //gtfo state is all kinds of not OK
      return;
    }
    //load HTML into index div mainContent
    var htmlTemplate = new XMLHttpRequest();
    htmlTemplate.onreadystatechange = function() {
        if (htmlTemplate.readyState == 4 && htmlTemplate.status == 200) {
            document.getElementById('mainContent').innerHTML = htmlTemplate.responseText;
        }
    }
    htmlTemplate.open("GET", state.template, true);
    htmlTemplate.send();
  }

}//end StateManager class def

var gameState = {
  template: "../html/game.html",
  name: "gameState"
}
