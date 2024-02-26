// 1. output-Values festlegen
// 2. Funktion, um search input in API-Link zu setzen
// 3. Funktion, um nach Sprache zu filtern
// 4. Funktion, um Ergebnisse zu sortieren
// 5. EventListener auf submit-Button, um alle Ergebnisse im HTML auszugeben

const searchOutput = document.querySelector(".search-output");
const form = document.querySelector("form");

// ! Funktion, um Searchinput des Users zu bekommen und an API weiterzugeben:
const getUserInput = () => {
  const userInput = document.querySelector("#search-input").value;
  console.log(userInput);

  // * API Daten mit Searchinput des Users fetchen:
  fetch(`https://newsapi.org/v2/everything?q=${userInput}&apiKey=01995892cbe34ab2ba4a69c3a6f542c1
  `)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

// ! Funktion, um nach Sprache zu filtern

// ! EventListener auf der Form/dem Submit-Button, um alles im HTML auszugeben:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("test");

  getUserInput();
});
