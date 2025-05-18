function convertToZhuyin(pinyin) {
  // 極簡版：pinyin ➜ 注音的對照（建議使用完整轉換工具）
  const map = {
    "a": "ㄚ", "b": "ㄅ", "c": "ㄘ", "d": "ㄉ", "e": "ㄜ",
    "f": "ㄈ", "g": "ㄍ", "h": "ㄏ", "i": "ㄧ", "j": "ㄐ",
    "k": "ㄎ", "l": "ㄌ", "m": "ㄇ", "n": "ㄋ", "o": "ㄛ",
    "p": "ㄆ", "q": "ㄑ", "r": "ㄖ", "s": "ㄙ", "t": "ㄊ",
    "u": "ㄨ", "v": "ㄩ", "w": "ㄨ", "x": "ㄒ", "y": "ㄧ", "z": "ㄗ"
  };

  return pinyin.split("").map(char => map[char.toLowerCase()] || char).join("");
}

// 補注音（資料載入後觸發）
function enrichZhuyin(data) {
  return data.map(entry => {
    if (!entry.zhuyin && entry.pinyin) {
      entry.zhuyin = convertToZhuyin(entry.pinyin);
    }
    return entry;
  });
}
