



Dictionary = function() {
    this.requestedWord = null;
}
Dictionary.AMOUNT_SHOWN = 15;


/**
 * Make sure that the index or error pages weren't given.
 *
 * @param {string} page - Page's HTML content.
 *
 * @return {boolean}
 */
Dictionary.prototype.isValidPage = function(page) { return console.error('Unimplemented'); }

/**
 * Extract definitions from page contents.
 *
 * @param {string} page
 *
 * @return {string[]}
 */
Dictionary.prototype.extractDefinitions = function(page) { return console.error('Unimplemented'); }

/**
 * Compound an URL that requests the page on which a dictionary displays it's
 * definitions.
 *
 * @param {string} word - roman transliteration with diacritics
 *
 * @return {string}
 */
Dictionary.prototype.makeUrl = function(page) { return console.error('Unimplemented'); }

/**
 * Write the HTML contents of the definitions span.
 *
 * @param {string} html
 */
Dictionary.prototype.setSpanText = function(html) {
    $('#__simply-sanskrit__>span#__simply-sanskrit-translation__').html(
        '<br><i>' + html + '</i>'
    );
}


/**
 * Request and process definitions for a given Sanskrit word.
 *
 * @param {string} word
 */
Dictionary.prototype.displayDefinitions = function(word) {

    // trim whitespace from search string
    word = word.replace(/[\s\t]+/g, '').replace(/[\s\t]+$/g, '');

    // indicate that definitions are being loaded
    this.setSpanText('...');

    // send the request message
    g_messageBus.sendMessage(
        { action: 'lookupSanskrit', 'word': word, 'url': this.makeUrl(word) },
        function(response) {

            // only display the definitions for the word we were looking for.
            if (this.requestedWord !== response.word) return;

            // check whether it's the index page or the error page.
            if (!this.isValidPage(response.body)) {
                this.setSpanText('(No definitions found)');
                return;
            }

            // show definitions
            let html = '', definitions = this.extractDefinitions(response.body);
            let num = definitions ? Math.min(Dictionary.AMOUNT_SHOWN, definitions.length) : 0;
            for (let i = 0; i < num; i++)
                html += definitions[i] + '<br>';

            this.setSpanText(html);

        }.bind(this)
    );
    this.requestedWord = word;

}



module.exports = Dictionary;
