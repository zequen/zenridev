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

sr.reveal(".indexHeroText", { delay: 150, origin: "top" });
sr.reveal(".indexHeroImage", { delay: 400, origin: "top" });
sr.reveal(".indexCodes", { delay: 550, origin: "top" });

console.log("works");
