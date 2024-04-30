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
sr.reveal(".indexCodes", { delay: 200, origin: "top" });
sr.reveal(".charactersHeading", { delay: 0, origin: "top" });
sr.reveal(".charactersSearchBar", { delay: 100, origin: "top" });
sr.reveal(".charactersGrid", { delay: 200, origin: "top" });

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

console.log("works");
