const videoContainer = document.querySelector(".videoPlayer");
const videoPlayer = document.querySelector(".videoPlayer video");
const videoController = document.querySelector(".videoPlayer__controls");
const playBtn = document.getElementById("videoPlayer__playBtn");
const volumeBtn = document.getElementById("videoPlayer__volumeBtn");
const currentTime = document.querySelector(".videoPlayer__currentTime");
const totalTime = document.querySelector(".videoPlayer__totalTime");
const currentBar = document.querySelector(".videoPlayer__currentBar");
let timeout;

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleMouseStop() {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    videoController.style.visibility = "hidden";
    videoContainer.style.cursor = "none";
  }, 3000);
  videoContainer.onmousemove = videoController.style.visibility = "visible";
  videoContainer.style.cursor = "auto";
}

function handleSpaceBar(e) {
  if (e.keyCode === 32) {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
}

function handleAutoRestart() {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleProgressBar() {
  let BarPos = videoPlayer.currentTime / videoPlayer.duration;
  currentBar.style.width = BarPos * 100 + "%";
}

function init() {
  document.addEventListener("keyup", handleSpaceBar);
  videoContainer.addEventListener("mousemove", handleMouseStop);
  videoPlayer.addEventListener("canplay", setTotalTime);
  videoPlayer.addEventListener("ended", handleAutoRestart);
  videoPlayer.addEventListener("timeupdate", handleProgressBar);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
}

if (videoContainer) {
  init();
}
