let dictionaryData = [];

function convertToZhuyin(pinyin) {
  if (!pinyin) return "";
  const map = {
    a: "ㄚ", b: "ㄅ", c: "ㄘ", d: "ㄉ", e: "ㄜ", f: "ㄈ", g: "ㄍ", h: "ㄏ",
    i: "ㄧ", j: "ㄐ", k: "ㄎ", l: "ㄌ", m: "ㄇ", n: "ㄋ", o: "ㄛ", p: "ㄆ",
    q: "ㄑ", r: "ㄖ", s: "ㄙ", t: "ㄊ", u: "ㄨ", v: "ㄩ", w: "ㄨ", x: "ㄒ",
    y: "ㄧ", z: "ㄗ"
  };
  return pinyin.split("").map(c => map[c.toLowerCase()] || c).join("");
}

function enrichZhuyin(data) {
  return data.map(entry => {
    if (!entry.zhuyin && entry.pinyin) {
      entry.zhuyin = convertToZhuyin(entry.pinyin);
    }
    return entry;
  });
}

fetch("../data/dictionary-data.json")
  .then(res => res.json())
  .then(data => {
    dictionaryData = enrichZhuyin(data);
    if (window.renderEntries) renderEntries(dictionaryData);
  })
  .catch(err => console.error("載入字典資料失敗", err));

function searchDictionary(keyword) {
  keyword = keyword.trim().toLowerCase();
  return dictionaryData.filter(entry =>
    entry.en.toLowerCase().includes(keyword) ||
    entry.zh.includes(keyword) ||
    (entry.pinyin && entry.pinyin.includes(keyword)) ||
    (entry.definition && entry.definition.toLowerCase().includes(keyword))
  );
}
