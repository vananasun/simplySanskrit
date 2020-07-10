Dictionary = function() {

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

    // trim whitespace and remove diacritics
    word = word.replace(/[\s\t]+/g, '')
               .replace(/[\s\t]+$/g, '')
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "");

    this.setSpanText('...');

    g_messageBus.sendMessage(
        { action: 'lookupSanskrit', 'word': word },
        function(response) {

            // Check whether it's the index page or the error page.
            if (!this.isValidPage(response)) {
                this.setSpanText('(No definitions found)');
                return;
            }

            // Show definitions
            let html = '', definitions = this.extractDefinitions(response);
            let num = definitions ? Math.min(Dictionary.AMOUNT_SHOWN, definitions.length) : 0;
            for (let i = 0; i < num; i++)
                html += definitions[i] + '<br>';
            this.setSpanText(html);

        }.bind(this)
    )


}

/**
 * Extract definitions from page contents.
 *
 * @param {string} page
 *
 * @return {string[]}
 */
Dictionary.prototype.extractDefinitions = function(page) {
    return page.match(/(?<=\<\/strong>\&mdash;)(.*?(?=  \&))/g);
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
