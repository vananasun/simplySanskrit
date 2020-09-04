let Dictionary = require('dictionary/dictionary.js');

SanskritDictionaryOrg = function() { Dictionary.call(this); };
SanskritDictionaryOrg.prototype = Object.create(Dictionary.prototype);
SanskritDictionaryOrg.prototype.constructor = Dictionary;


SanskritDictionaryOrg.prototype.isValidPage = function(page) {
    return (!(page.includes("Error: Can't find")
            ||page.includes("1\n<h1>Sanskrit ")));
}

SanskritDictionaryOrg.prototype.extractDefinitions = function(page) {
    return page.match(/(?<=\<\/strong>\&mdash;)(.*?(?=[\s]+\&))/g);
}

SanskritDictionaryOrg.prototype.makeUrl = function(word) {

    // remove diacritics
    word = word.normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "");

   // figure out the url to perform a fetch
   let host = noplugin ? (Util.BaseUrl() + 'word/sanskritdictionaryorg/')
                       : 'https://sanskritdictionary.org/';
   return host + encodeURIComponent(word);

}



module.exports = SanskritDictionaryOrg;
