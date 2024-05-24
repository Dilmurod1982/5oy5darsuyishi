const songs = [
  "Roxette - It Must Have Been Love",
  "James Blunt - You're Beautiful",
  "Любэ - Позови Меня Тихо По Имени",
  "James Blunt - Goodbye My Lover (Acoustic Version)",
];
const btnPlay = document.getElementById("play");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const container = document.getElementById("container");
const title = document.getElementById("title");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

let music = 0;

btnPlay.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    playFunc("play");
  } else {
    playFunc("pause");
  }
});

function playFunc(c) {
  container.classList.toggle("play");
  btnPlay.innerHTML = `<i class="fa-sharp fa-solid fa-${c}"></i>`;
  if (c == "play") {
    audio.pause();
  } else {
    audio.play();
  }
}

btnNext.addEventListener("click", nextFunc);
btnPrev.addEventListener("click", prevFunc);
audio.addEventListener("timeupdate", timeUpdate);
progressContainer.addEventListener("click", function (e) {
  let currentTime = audio.currentTime;
  let duration = audio.duration;
  let width = this.clientWidth;
  audio.currentTime = (e.offsetX / width) * duration;
});

function timeUpdate(e) {
  let currentTime = e.srcElement.currentTime;
  let duration = e.srcElement.duration;
  let timeResult = currentTime / (duration / 100);
  progress.style.width = `${timeResult}%`;
  if (audio.currentTime == audio.duration) {
    nextFunc();
  }
}

function nextFunc() {
  music++;
  if (music > songs.length - 1) {
    music = 0;
  }
  prevNext();
}
function prevFunc() {
  music--;
  if (music < 0) {
    music = songs.length - 1;
  }
  prevNext();
}

function prevNext() {
  audio.src = `./sounds/${songs[music]}.mp3`;
  audio.play();
  cover.src = `./cover/${songs[music]}.jpg`;
  title.textContent = songs[music];
}

function allTime() {
  if (timeResult == 100) {
    nextFunc();
  }
}
