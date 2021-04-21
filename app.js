//A solid crap ton of variables set to reference different elements
const symbol = document.getElementById("play");
const audio = document.getElementById("sounds");
const video = document.getElementById("video")
const startAudio = document.getElementById("bowl");
const endAudio = document.getElementById("bell");
var screenText = document.getElementsByClassName("ml3")[0]
var div = document.getElementById("player");
//Creating the "play/pause" button element
var playerImage = document.createElement("img");
  playerImage.src = "./content/pause.svg";
  playerImage.id = "play";
  playerImage.setAttribute("width", "600px");
  playerImage.setAttribute("height", "600px");
  playerImage.setAttribute("alt", "play/pause");
  playerImage.setAttribute("onClick", "playButton()");
//Variable that will hold the setTimeout
var timer;

//A way to keep up with time, will almost primarily be used for the pause function.
var currentTime;
var elapsedTime;
var duration;
audio.ontimeupdate = () => {
currentTime = audio.currentTime;
/*     elapsedTime = duration - currentTime; */
    console.log("Current Time: ")
    console.log(currentTime);
/*     console.log("Elapsed Time: ")
    console.log(elapsedTime); */
   };


const app = () => {
  var appStarted = false;
  

  animeComponent = () => {
/*This is a component I forked from "https://tobiasahlin.com/moving-letters/"
   Wrap every letter in a span.
   This component must be ran every time innerHTML is added to the page for it to work. */
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
  }
  // First call for initial animation.
  animeComponent();

  // A function for setting time. Reduces bload from the copy/pasted timeout function.
  setTime = (duration) => {
    timer = window.setTimeout(() => {audio.pause(); 
            endAudio.play();
            screenText.innerHTML= ("It's nice to take a time out.");
            animeComponent();
            div.removeChild(playerImage);
            appStarted = false;
            currentTime = 0;
        }, (duration*60)*1000)
  }

  // Play/Pause Button Controls:
  playButton = () => {
      const symbol = document.getElementById("play");
      const audio = document.getElementById("sounds");
      const startAudio = document.getElementById("bowl");
      const video = document.getElementById("video")
      // Using a slice method to shorten the length of the URL. URL must be included as src.
      if (symbol.src.slice(21) == "/content/play.svg"){
        // Play
        symbol.src = "./content/pause.svg";
        setTime(((duration*60) - currentTime)/60)
        audio.play();
        video.play();
        console.log("playing..");
        startAudio.play();
      } else {
        // Pause
        symbol.src = "./content/play.svg";
        window.clearTimeout(timer);
        audio.pause();
        video.pause();
        startAudio.pause();
        
        console.log("pausing..");
      }
  }
 
  // Function that starts the app.
  beginTime = () => {
      event.preventDefault();
      // Setting variables to DOM elements
      duration = document.getElementById('time').value;
      

      /* Controlling logic:
          Decides the app is playing. Loops audio until user's inputted time duration is complete.
          Ends with a bell and resets the page to 'appStarted=false' */
      if (appStarted == false){
        div.appendChild(playerImage)
        appStarted = true;
        audio.loop = true;
        startAudio.play()
        audio.play();

        screenText.innerHTML= ("Time set for " + duration + " min.");
        animeComponent();
        
        setTime(duration);
        animeComponent();
        console.log(timer);
        console.log(duration);
      }
  }
}
app()

