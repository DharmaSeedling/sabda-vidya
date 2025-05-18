function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function addToFavorites(word) {
  const favs = getFavorites();
  if (!favs.includes(word)) {
    favs.push(word);
    localStorage.setItem("favorites", JSON.stringify(favs));
    return true;
  }
  return false;
}
