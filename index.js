var _ = require('lodash');

var GLYPHS = {
  A: "▲Ʌ∀",
  B: "ᗸɃ",
  C: "Ͽ",
  D: "Ɖ",
  E: "3ℇΣ",
  F: "╒Ғ",
  G: "Ǥ",
  H: "Ӊ",
  I: "Ꮖ!",
  J: "ℑ",
  K: "K",
  L: "Ꝉ",
  M: "ϻӎ",
  N: "И",
  O: "ΩΘ⍉",
  P: "ᕈ",
  Q: "Ϙ",
  R: "Я",
  S: "5",
  T: "₸†",
  U: "⊔∐",
  V: "ᐯ√",
  W: "ꟽШ",
  X: "+╳χ",
  Y: "ɣγ",
  Z: "Ƶ"
};

var VOWELS = ["A", "E", "I", "O", "U"];

var hipsterify = function(text) {
  var words, modified, findGlyph;

  words     = text.toString().toUpperCase().split(" ");
  modified  = [];

  findGlyph = function(char, index, word, diff) {
    var modify, glyphs;

    glyphs = GLYPHS[char];

    if (!glyphs) {
      return char;
    }

    modify = 0.5;
    modify -= diff * diff * diff;

    if (~VOWELS.indexOf(char)) {
      modify += 0.3;
    }

    if (word[index - 1] === char || word[index + 1] === char) {
      modify *= 2;
    }

    if (modified[char]) {
      modify += 0.1;
    }

    modify *= glyphs.length / 2;

    if (modify >= 0.45) {
      if (!modified[char]) {
        modified[char] = glyphs[index % glyphs.length];
      }

      return modified[char];
    }

    return char;
  };

  _.forEach(words, function(word, index) {
    var i, len, mid;

    chars = word.split("");

    len = chars.length;
    mid = len / 2;

    for (i = Math.ceil(mid); i >= 0; i--) {
      chars[i] = findGlyph(word[i], i, word, (mid - i) / len);
    }

    for (i = Math.floor(mid); i < len; i++) {
      chars[i] = findGlyph(word[i], i, word, (i - mid) / len);
    }

    words[index] = chars.join("");
  });

  return words.join(" ");
};

module.exports = hipsterify;
