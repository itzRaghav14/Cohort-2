const time = new Date();
const TYPE = 2;

let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();

const displayTime = (hours, minutes, seconds, type = 1) => {
  if (type == 1) {
    console.log (hours + ":" + minutes + ":" + seconds);
  }
  else {
    const period = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    console.log (hours + ":" + minutes + ":" + seconds + " " + period);
  }
}

const id = setInterval (() => {
  seconds++;

  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes == 60) {
    minutes = 0;
    hours++;
  }

  if (hours == 24) {
    hours = 0;
  }

  displayTime (hours, minutes, seconds, TYPE);

}, 1000);