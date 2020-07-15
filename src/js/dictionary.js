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
Dictionary.prototype.isValidPage = function(page) {
    return (!(page.includes("Error: Can't find")
            ||page.includes("1\n<h1>Sanskrit ")));
}

/**
 * Request and process definitions for a given Sanskrit word.
 *
 * @param {string} word
 */
Dictionary.prototype.displayDefinitions = function(word) {

    // do not send a request if we already have sent a request, this prevents
    // any definitions from showing up and then disappearing as "not found".
    // if (this.requestedWord) return;

    // trim whitespace and remove diacritics
    word = word.replace(/[\s\t]+/g, '')
               .replace(/[\s\t]+$/g, '')
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "");

    // indicate that definitions are being loaded
    this.setSpanText('...');

    // send the request message
    g_messageBus.sendMessage(
        { action: 'lookupSanskrit', 'word': word },
        function(response, definedWord) {

            // only display the definitions for the word we were looking for.
            if (this.requestedWord !== definedWord) return;

            // check whether it's the index page or the error page.
            if (!this.isValidPage(response)) {
                this.setSpanText('(No definitions found)');
                return;
            }

            // show definitions
            let html = '', definitions = this.extractDefinitions(response);
            resp=response;
            console.log(definitions, response)
            let num = definitions ? Math.min(Dictionary.AMOUNT_SHOWN, definitions.length) : 0;
            for (let i = 0; i < num; i++)
                html += definitions[i] + '<br>';

            this.setSpanText(html);

        }.bind(this)
    );
    this.requestedWord = word;

}

/**
 * Extract definitions from page contents.
 *
 * @param {string} page
 *
 * @return {string[]}
 */
Dictionary.prototype.extractDefinitions = function(page) {
    return page.match(/(?<=\<\/strong>\&mdash;)(.*?(?=[\s]+\&))/g);
}

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

module.exports = Dictionary;
