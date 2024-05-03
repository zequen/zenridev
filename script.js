// hamburger menu from https://youtu.be/flItyHiDm7E?si=5jFi-ZNtFSz1Lzq4
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const navigationBar = document.querySelector(".navigationBar");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navigationBar.classList.toggle("active");
});

document.querySelectorAll(".navLink").forEach((n) =>
  n.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
    navigationBar.classList.remove("active");
  })
);

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

document.addEventListener("DOMContentLoaded", function () {
  var countDownDate = new Date("May 8, 2024 14:59:00").getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementsByClassName("days")[0].innerHTML = days;
    document.getElementsByClassName("hours")[0].innerHTML = hours;
    document.getElementsByClassName("minutes")[0].innerHTML = minutes;
    document.getElementsByClassName("seconds")[0].innerHTML = seconds;

    if (distance < 0) {
      clearInterval(x);
      document.getElementsByClassName("days")[0].innerHTML = "00";
      document.getElementsByClassName("hours")[0].innerHTML = "00";
      document.getElementsByClassName("minutes")[0].innerHTML = "00";
      document.getElementsByClassName("seconds")[0].innerHTML = "00";
    }
  }, 1000);
});

console.log("works");
