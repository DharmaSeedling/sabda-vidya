window.addEventListener("DOMContentLoaded", () => {
  const hash = decodeURIComponent(location.hash.slice(1));
  const showFavoritesBtn = document.getElementById("showFavorites");

  if (hash) {
    const results = searchDictionary(hash);
    renderEntries(results);
  }

  if (showFavoritesBtn) {
    showFavoritesBtn.addEventListener("click", () => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      const results = dictionaryData.filter(entry => favs.includes(entry.en));
      renderEntries(results);
    });
  }
});
