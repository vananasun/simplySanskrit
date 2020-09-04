let Dictionary = require('dictionary/dictionary.js');

SpokenSanskritOrg = function() { Dictionary.call(this); };
SpokenSanskritOrg.prototype = Object.create(Dictionary.prototype);
SpokenSanskritOrg.prototype.constructor = Dictionary;


SpokenSanskritOrg.prototype.isValidPage = function(page) {
    return (!(page.includes("Please check the direction")));
}

SpokenSanskritOrg.prototype.extractDefinitions = function(page) {
    let matches = page.match(/(?<=mode\=3\>)((?!\&).+?)(?=\<\/a)/g);
    definitions = [];
    for (let i = 1; i < matches.length; i += 2)
        definitions.push(matches[i]);
    return definitions;
}

SpokenSanskritOrg.prototype.makeUrl = function(word) {

    if (noplugin)
        return Util.BaseUrl() + 'word/spokensanskritorg/' + encodeURIComponent(word);

    let query = new URLSearchParams({
        'mode': 3,          // the search result page
        'script': 'ia',     // search query has diacritics
        'direct': 'se',     // sanskrit to english
        'anz': 20,          // currently only allows 100 or all results
        'tran_input': encodeURIComponent(word),
    }).toString();
    return 'https://spokensanskrit.org/index.php?' + query;

}


module.exports = SpokenSanskritOrg;
