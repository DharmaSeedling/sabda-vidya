function renderEntries(entries) {
  const container = document.getElementById("dictionaryEntries");
  container.innerHTML = "";

  if (!entries || entries.length === 0) {
    container.innerHTML = "<p>查無資料 🙏</p>";
    return;
  }

  entries.forEach(entry => {
    const block = document.createElement("div");
    block.className = "entry";
    block.innerHTML = `
      <h3>${entry.en} <span class="zh">（${entry.zh}）</span> <span class="level">[${entry.level}]</span></h3>
      <p class="definition">${entry.definition}</p>
      <details>
        <summary>發音 Pronunciation</summary>
        <ul>
          <li><strong>IPA:</strong> ${entry.ipa || "-"}</li>
          <li><strong>KK:</strong> ${entry.kk || "-"}</li>
          <li><strong>拼音:</strong> ${entry.pinyin || "-"}</li>
          <li><strong>注音:</strong> ${entry.zhuyin || "-"}</li>
        </ul>
      </details>
      ${entry.examples?.length ? `
        <details>
          <summary>例句 Example</summary>
          <ul>
            ${entry.examples.map(ex => `<li>${ex}</li>`).join("")}
          </ul>
        </details>` : ""}
      <button class="link-sutra" data-key="${entry.zh}">🔍 心經中查找</button>
      <button class="fav-btn" data-word="${entry.en}">⭐ 加入最愛</button>
    `;
    container.appendChild(block);
  });
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("link-sutra")) {
    const term = e.target.dataset.key;
    window.open(`heartsutra.html#${encodeURIComponent(term)}`, "_blank");
  }
  if (e.target.classList.contains("fav-btn")) {
    const word = e.target.dataset.word;
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.includes(word)) {
      favorites.push(word);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`已加入「${word}」到最愛 🧡`);
    }
  }
});
