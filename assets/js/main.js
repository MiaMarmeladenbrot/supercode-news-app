const searchOutput = document.querySelector(".search-output");
const form = document.querySelector("form");
const errorOutput = document.querySelector(".error");

// ! Funktion, um mit Search-Input, Sprachauwahl und Sortierung API-Daten zu fetchen:
const getUserInput = () => {
  // * Input-Values:
  const userInput = document.querySelector("#search-input").value;
  //   console.log(userInput);

  const langInput = document.querySelector("#lang").value;
  //   console.log(langInput);

  const sortInput = document.querySelector("#sort").value;
  //   console.log(sortInput);

  // * Fehlermeldung bei leerem Input:
  if (userInput.length < 1) {
    errorOutput.innerHTML = "Bitte gib ein Suchwort ein.";
  }

  // * API Daten mit Searchinput, Language-Auswahl und Sortierung fetchen:
  fetch(`https://newsapi.org/v2/everything?q=${userInput}&language=${langInput}&sortBy${sortInput}&apiKey=01995892cbe34ab2ba4a69c3a6f542c1
  `)
    .then((res) => res.json())
    .then((newsData) => {
      console.log(newsData);

      // * über alle Artikel des Suchergebnisses iterieren, um die jeweiligen News-Daten ins HTML zu schreiben:
      newsData.articles.forEach((articleData) => {
        // console.log(articleData);
        // * Fehlermeldungsfeld leeren:
        errorOutput.innerHTML = "";

        // const time = articleData.publishedAt.toUTCString();
        // console.log(time);

        // * Datum leserlich hinzufügen:
        const date = new Date(articleData.publishedAt);
        // console.log(date);
        const day =
          date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
        const month =
          date.getUTCMonth() + 1 < 10
            ? `0${date.getUTCMonth() + 1}`
            : date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const hours =
          date.getUTCHours() < 10
            ? `0${date.getUTCHours()}`
            : date.getUTCHours();
        const minutes =
          date.getUTCMinutes() < 10
            ? `0${date.getUTCMinutes()}`
            : date.getUTCMinutes();

        // console.log(day, month, year, hours, minutes);

        // * Daten ins HTML schreiben:
        searchOutput.innerHTML += `
        <div>
        <img src="${articleData.urlToImage}" alt="${articleData.title}"/>
        <section>
         <h2>${articleData.title}</h2>
         <p>${articleData.description}</p>
         <h3>${(articleData.source.name = null
           ? ""
           : articleData.source.name)}</h3>
           <p>${day}.${month}.${year}, ${hours}:${minutes}</p>
         <a href="${articleData.url}" target="_blank">Zum Artikel</a>
         </section>
        </div>
        `;

        // publishedAt : "2024-02-18T18:54:13Z"
        // source.name : "Die Zeit"
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

// ######
// articleData.urlToImage = null
//     ? ""
//     : <img src="${articleData.urlToImage}" alt="${articleData.title}"/>
