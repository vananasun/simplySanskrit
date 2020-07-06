Translator = function() {

}

Translator.prototype.devanagariToLatin = function(input) {
    input = input.replace(/्/g, "\u200b");
    input = input.replace(/अ/g, "a");
    input = input.replace(/आ/g, "ā");
    input = input.replace(/ा/g, "ā");
    input = input.replace(/इ/g, "i");
    input = input.replace(/ि/g, "i");
    input = input.replace(/ई/g, "ī");
    input = input.replace(/ी/g, "ī");
    input = input.replace(/उ/g, "u");
    input = input.replace(/ु/g, "u");
    input = input.replace(/ऊ/g, "ū");
    input = input.replace(/ू/g, "ū");
    input = input.replace(/ऋ/g, "ṛ");
    input = input.replace(/ृ/g, "ṛ");
    input = input.replace(/ॠ/g, "ṝ");
    input = input.replace(/ॄ/g, "ṝ");
    input = input.replace(/ऌ/g, "ḷ");
    input = input.replace(/ॢ/g, "ḷ");
    input = input.replace(/ॡ/g, "ḹ");
    input = input.replace(/ॣ/g, "ḹ");
    input = input.replace(/ए/g, "e");
    input = input.replace(/े/g, "e");
    input = input.replace(/ऐ/g, "ai");
    input = input.replace(/ै/g, "ai");
    input = input.replace(/ओ/g, "o");
    input = input.replace(/ो/g, "o");
    input = input.replace(/औ/g, "au");
    input = input.replace(/ौ/g, "au");
    input = input.replace(/ं/g, "ṃ");
    input = input.replace(/ँ/g, "ṁ");
    input = input.replace(/ः/g, "ḥ");
    input = input.replace(/क/g, "kA");
    input = input.replace(/ख/g, "khA");
    input = input.replace(/ग/g, "gA");
    input = input.replace(/घ/g, "ghA");
    input = input.replace(/ङ/g, "ṅA");
    input = input.replace(/च/g, "cA");
    input = input.replace(/छ/g, "chA");
    input = input.replace(/ज/g, "jA");
    input = input.replace(/झ/g, "jhA");
    input = input.replace(/ञ/g, "ñA");
    input = input.replace(/ट/g, "ṭA");
    input = input.replace(/ठ/g, "ṭhA");
    input = input.replace(/ड/g, "ḍA");
    input = input.replace(/ढ/g, "ḍhA");
    input = input.replace(/ण/g, "ṇA");
    input = input.replace(/त/g, "tA");
    input = input.replace(/थ/g, "thA");
    input = input.replace(/द/g, "dA");
    input = input.replace(/ध/g, "dhA");
    input = input.replace(/न/g, "nA");
    input = input.replace(/प/g, "pA");
    input = input.replace(/फ/g, "phA");
    input = input.replace(/ब/g, "bA");
    input = input.replace(/भ/g, "bhA");
    input = input.replace(/म/g, "mA");
    input = input.replace(/य/g, "yA");
    input = input.replace(/र/g, "rA");
    input = input.replace(/ल/g, "lA");
    input = input.replace(/व/g, "vA");
    input = input.replace(/श/g, "śA");
    input = input.replace(/ष/g, "ṣA");
    input = input.replace(/स/g, "sA");
    input = input.replace(/ह/g, "hA");
    input = input.replace(/ळ/g, "ḻA");
    input = input.replace(/ॐ/g, "oṃ");
    input = input.replace(/ऽ/g, "’");
    input = input.replace(/।/g, "|");
    input = input.replace(/॥/g, "||");

    input = input.replace(/A\u200b/g, "");
    input = input.replace(/Aā/g, "ā");
    input = input.replace(/Aa/g, "a");
    input = input.replace(/Ai/g, "i");
    input = input.replace(/Au/g, "u");
    input = input.replace(/Ae/g, "e");
    input = input.replace(/Ao/g, "o");
    input = input.replace(/Aī/g, "ī");
    input = input.replace(/Aū/g, "ū");
    input = input.replace(/Aṛ/g, "ṛ");
    input = input.replace(/Aṝ/g, "ṝ");
    input = input.replace(/Aḷ/g, "ḷ");
    input = input.replace(/Aḹ/g, "ḹ");
    input = input.replace(/A/g, "a");

    input = input.replace(/०/g, "0");
    input = input.replace(/१/g, "1");
    input = input.replace(/२/g, "2");
    input = input.replace(/३/g, "3");
    input = input.replace(/४/g, "4");
    input = input.replace(/५/g, "5");
    input = input.replace(/६/g, "6");
    input = input.replace(/७/g, "7");
    input = input.replace(/८/g, "8");
    input = input.replace(/९/g, "9");

    input = input.replace(/॑/g, "̍");
    input = input.replace(/᳚/g, "̎");

    input = input.replace(/॓/g, "̀");
    input = input.replace(/॔/g, "́");
    input = input.replace(/॒/g, "̱");
    input = input.replace(/᳒/g, "̄");
    input = input.replace(/᳓/g, "̋");
    input = input.replace(/᳐/g, "̂");

    return input;

}

module.exports = Translator;
