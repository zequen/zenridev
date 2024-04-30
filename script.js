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

console.log("works");
