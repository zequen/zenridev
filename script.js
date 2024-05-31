// navbar stuff
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-menu");

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");

// scroll reveal

const sr = ScrollReveal({
  distance: "65px",
  duration: 2600,
  delay: 450,
  reset: true,
});

sr.reveal(".indexHeroText", { delay: 0, origin: "top" });
sr.reveal(".indexHeroImage", { delay: 100, origin: "top" });
sr.reveal(".indexCodesHeading", { delay: 0, origin: "bottom" });
sr.reveal(".indexCodesGrid", { delay: 100, origin: "bottom" });
sr.reveal(".indexCarouselHeading", { delay: 0, origin: "bottom" });
sr.reveal(".indexCarousel", { delay: 0, origin: "bottom" });

sr.reveal(".charactersHeading", { delay: 0, origin: "top" });
sr.reveal(".charactersSearchBar", { delay: 50, origin: "top" });
sr.reveal(".charactersGridBox", { delay: 0, origin: "bottom" });

sr.reveal(".tierListHeader", { delay: 50, origin: "top" });
sr.reveal(".tierList", { delay: 50, origin: "bottom" });

// search bar

const search = () => {
  const charactersSearchBox = document
    .getElementById("charactersSearch")
    .value.trim()
    .toUpperCase();
  const characters = document.querySelectorAll(".charactersGridBox");

  characters.forEach((character) => {
    const characterName = character
      .querySelector("h3")
      .textContent.trim()
      .toUpperCase();
    if (characterName.includes(charactersSearchBox)) {
      character.style.display = "";
    } else {
      character.style.display = "none";
    }
  });
};

// carousel from https://www.codingnepalweb.com/draggable-card-slider-html-css-javascript/ (my teacher said to use this)

const wrapper = document.querySelector(".carouselWrapper");
const carousel = document.querySelector(".indexActualCarousel");
const firstCardWidth = carousel.querySelector(".carouselCard").offsetWidth;
const arrowBtns = document.querySelectorAll(".carouselWrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// faye's timer

function updateCountdowns(countdowns) {
  // Function to get current time in AEST
  function getCurrentTimeInAEST() {
    var now = new Date();
    var timeOffset = now.getTimezoneOffset();
    var aestOffset = 10; // AEST is UTC+10 (i think this changes with daylight savings soooo, idk how to account for that, im lazy)
    return new Date(now.getTime() + (timeOffset + aestOffset) * 60000); // Convert minutes to milliseconds (mafs)
  }

  // Iterate over each countdown
  countdowns.forEach(function (countdown) {
    var targetDate = new Date(countdown.endDate); // Parse end date
    var divClass = countdown.divClass;

    var x = setInterval(function () {
      var nowAEST = getCurrentTimeInAEST(); // Get current time in AEST
      var distance = targetDate - nowAEST;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24)); // Calculate days, hours, minutes, seconds (basic algebra)
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var countdownElements = document.getElementsByClassName(divClass);
      Array.from(countdownElements).forEach(function (element) {
        element.querySelector(".days").innerHTML = days;
        element.querySelector(".hours").innerHTML = hours;
        element.querySelector(".minutes").innerHTML = minutes;
        element.querySelector(".seconds").innerHTML = seconds;

        if (distance < 0) {
          clearInterval(x);
          element.innerHTML = "EXPIRED";
        }
      });
    }, 1000);
  });
}

// Example usage:
var countdowns = [
  { divClass: "aventurineTimer", endDate: "2024-05-08T14:59:00+10:00" }, // Adjusted to AEST
  { divClass: "robinTimer", endDate: "2024-05-08T15:00:00+10:00" },
  { divClass: "boothillTimer", endDate: "2024-05-29T14:59:00+10:00" }, // Adjusted to AEST (so then it doesnt matter what timezone the user is in,  itll calculate the correct time with AEST as the set time, i assume this is how it works in this game, i dont play it)
  // Add more countdowns as needed
];

updateCountdowns(countdowns);

console.log("works");
