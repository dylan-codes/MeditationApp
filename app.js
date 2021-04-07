const app = () => {
  var appStarted = false;

  // Wrap every letter in a span
  var textWrapper = document.querySelector('.ml3');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml3 .letter',
      opacity: [0,1],
      easing: "easeInOutQuad",
      duration: 900,
      delay: (el, i) => 150 * (i+1)
    })/*.add({
      targets: '.ml3',
      opacity: 0,
      duration: 1000,
      delay: 1000
    })*/;
  
  playButton = () => {
      symbol = document.getElementById("play");
      audio = document.getElementById("sounds");
      /*Using a slice method to shorten the length of the URL. URL must be included as src. */
      if (symbol.src.slice(21) == "/content/play.svg"){
        symbol.src = "./content/pause.svg";
        audio.play();
        console.log("playing..");
      } else {
        symbol.src = "./content/play.svg";
        audio.pause();
        console.log("pausing..");
      }
  }
  {/* <img src="./content/play.svg" onclick="playButton()" id="play" width="600px" height="600px"alt="play"/> */}
  beginTime = () => {
      event.preventDefault();
      duration = document.getElementById('time').value;
      audio = document.getElementById("sounds");
      startAudio = document.getElementById("bowl");
      endAudio = document.getElementById("bell");
  
      var playerImage = document.createElement("img");
      playerImage.src = "./content/pause.svg";
      playerImage.id = "play";
      playerImage.setAttribute("width", "600px");
      playerImage.setAttribute("height", "600px");
      playerImage.setAttribute("alt", "play/pause");
      playerImage.setAttribute("onClick", "playButton()");
  
      var div = document.getElementById("player");
  
      startAudio.play()
  
      if (appStarted == false){
        div.appendChild(playerImage)
        appStarted = true;
        audio.play();
        audio.loop = true;
        document.getElementsByClassName("ml3")[0].innerHTML= ("Time set for " + duration + " min.");
        setTimeout(() => {audio.pause(); 
          endAudio.play();
          document.getElementsByClassName("ml3")[0].innerHTML= ("It's nice to take a time out.");
          div.removeChild(playerImage);
          appStarted = false;
        }, (duration*60)*1000)
      }
  }
  
  /* A function to run at the finish of the timer, should stop the timer/music, disable the play/pause button, and display a motivational quote */
  finishTime = () => {
  
  }
}

app()

