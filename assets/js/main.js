// # noch to do
// - ternary, falls etwas keinen Inhalt hat
// - CSS
// - in weitere Funktionen aufteilen?

const searchOutput = document.querySelector(".search-output");
const form = document.querySelector("form");

// ! Funktion, um mit Search-Input, Sprachauwahl und Sortierung API-Daten zu fetchen:
const getUserInput = () => {
  // * Input-Values:
  const userInput = document.querySelector("#search-input").value;
  console.log(userInput);

  const langInput = document.querySelector("#lang").value;
  console.log(langInput);

  const sortInput = document.querySelector("#sort").value;
  console.log(sortInput);

  // * API Daten mit Searchinput, Language-Auswahl und Sortierung fetchen:
  fetch(`https://newsapi.org/v2/everything?q=${userInput}&language=${langInput}&sortBy${sortInput}&apiKey=01995892cbe34ab2ba4a69c3a6f542c1
  `)
    .then((res) => res.json())
    .then((newsData) => {
      console.log(newsData);

      // * über alle Artikel des Suchergebnisses iterieren, um die jeweiligen Daten ins HTML zu schreiben:
      newsData.articles.forEach((articleData) => {
        console.log(articleData);
        searchOutput.innerHTML += `
        <div>
        <h2>${articleData.title}</h2>
        <p>${articleData.description}</p>
        <img src="${articleData.urlToImage}" alt="${articleData.title}"/>
        <a href="${articleData.url}" target="_blank">Zum Artikel</a>

        </div>
        `;
      });
    })
    .catch((err) => console.log(err));
};

// ! EventListener auf der Form/dem Submit-Button, um alles im HTML auszugeben:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   console.log("test");
  // * HTML-Output-Feld vor jeder Such ausgabe leeren:
  searchOutput.innerHTML = "";

  // * Funktion für User-Such-Ausgabe aufrufen:
  getUserInput();
});
