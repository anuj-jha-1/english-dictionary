const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");
const pos = document.getElementById("part-of-speech");
const example = document.getElementById("example");
const synonyms = document.getElementById("synonyms");
const antonyms = document.getElementById("antonyms");
const themeToggle = document.getElementById("theme-toggle");

input.addEventListener("keyup", async (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const word = input.value.trim();
    infoText.style.display = "block";
    meaningContainer.style.display = "none";
    infoText.innerText = `Searching the meaning of "${word}"...`;

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();

      if (!data[0]) {
        infoText.innerText = `No definition found for "${word}".`;
        return;
      }

      infoText.style.display = "none";
      meaningContainer.style.display = "block";

      const def = data[0];
      title.innerText = def.word;
      meaning.innerText = def.meanings[0].definitions[0].definition;
      audio.src = def.phonetics[0]?.audio || "";

      pos.innerText = def.meanings[0].partOfSpeech || "-";
      example.innerText = def.meanings[0].definitions[0].example || "-";
      synonyms.innerText = def.meanings[0].synonyms?.join(", ") || "-";
      antonyms.innerText = def.meanings[0].antonyms?.join(", ") || "-";
    } catch (error) {
      infoText.innerText = "An error occurred, please try again.";
      meaningContainer.style.display = "none";
    }
  }
});

// Dark/Light Mode Toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
