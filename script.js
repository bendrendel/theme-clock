const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const root = document.querySelector("html");
let hourCycles = 0;
let minuteCycles = 0;
let secondCycles = 0;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", () => {
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
    toggle.innerHTML = "Dark mode";
  } else {
    root.classList.add("dark");
    toggle.innerHTML = "Light mode";
  }
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  if (seconds === 0) {
    secondCycles++;
    if (minutes === 0) {
      minuteCycles++;
      if (hoursForClock === 0) {
        hourCycles++;
      }
    }
  }

  const hourRotation =
    hourCycles * 360 + hoursForClock * (360 / 12) + minutes * (360 / 12 / 60);
  const minuteRotation =
    minuteCycles * 360 + minutes * (360 / 60) + seconds * (360 / 60 / 60);
  const secondRotation = secondCycles * 360 + seconds * (360 / 60);

  hourEl.style.transform = `translate(-50%, -100%) rotate(${hourRotation}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minuteRotation}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${secondRotation}deg)`;

  timeEl.innerHTML = `${hoursForClock === 0 ? 12 : hoursForClock}:${
    minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

setTime();

setInterval(setTime, 1000);
