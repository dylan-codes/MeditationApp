const app = () => {
  var appStarted = false;
  
  //This is a component I forked from "https://tobiasahlin.com/moving-letters/"
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
 
  //Function that starts the app.
  beginTime = () => {
      event.preventDefault();
      //Setting variables to DOM elements
      var duration = document.getElementById('time').value;
      let audio = document.getElementById("sounds");
      let startAudio = document.getElementById("bowl");
      let endAudio = document.getElementById("bell");
      var div = document.getElementById("player");
      //Creating the "play/pause" button element
      var playerImage = document.createElement("img");
      playerImage.src = "./content/pause.svg";
      playerImage.id = "play";
      playerImage.setAttribute("width", "600px");
      playerImage.setAttribute("height", "600px");
      playerImage.setAttribute("alt", "play/pause");
      playerImage.setAttribute("onClick", "playButton()");
      
      
      /* App begins with the starting meditation bowl.
         Bug when user pauses audio playback at the beginning, the bowl.mp3 sound doesn't pause */
      startAudio.play()
  
      /* Controlling logic:
          Decides the app is playing. Loops audio until user's inputted time duration is complete.
          Ends with a bell and resets the page to 'appStarted=false' */
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
}

app()

