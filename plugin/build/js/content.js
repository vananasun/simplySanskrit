(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let Phonetics = require('phonetics.js');
let Dictionary = require('dictionary.js');
let Popup = require('popup.js');

g_devanagari = {
    'enabled': false,
    'phonetics': new Phonetics(),
    'dictionary': new Dictionary(),
    'popup': new Popup(),
};
g_devanagari.translateSelection = function() {

    // Make sure we didn't select the phonetics inside the popup
    let selection = document.getSelection();
    if (selection.rangeCount > 0 &&
        selection.getRangeAt(0).startContainer.parentNode.id === '__easy-devanagari-phonetics__') {
        g_devanagari.dictionary.displayDefinitions(selection.toString());
        return;
    }

    // Check if has selection and get bounding rectangle,
    // and make sure the selection wasn't too big
    let text = selection.toString();
    if (selection.rangeCount <= 0 || !text.length || text.length > 500) {
        g_devanagari.popup.destroy();
        return;
    }

    // Show popup
    g_devanagari.popup.show(text, selection.getRangeAt(0).getBoundingClientRect());

}





chrome.runtime.onMessage.addListener(function(request, sender, callback) {

    g_devanagari.enabled = request.args['show-latin'];

    if (g_devanagari.enabled) {
        g_devanagari.translateSelection();
    } else {
        g_devanagari.popup.destroy();
    }

    callback();
});



document.addEventListener('selectionchange', () => {

    if (g_devanagari.enabled)
        g_devanagari.translateSelection();

});

document.addEventListener('scroll', () => {
    g_devanagari.popup.updatePosition();
});

},{"dictionary.js":2,"phonetics.js":3,"popup.js":4}],2:[function(require,module,exports){
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

    this.setSpanText('...');

    chrome.runtime.sendMessage(
        { action: 'lookupSanskrit', 'word': word },
        function(response) {

            // Check whether it's the index page or the error page.
            if (!this.isValidPage(response)) {
                this.setSpanText('(No definitions found)');
                return;
            }

            // Show definitions
            let html = '', definitions = this.extractDefinitions(response);
            for (let i = 0; i < Math.min(Dictionary.AMOUNT_SHOWN, definitions.length); i++)
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
    $('#__easy-devanagari__>span#__easy-devanagari-translation__').html(
        '<br><i>' + html + '</i>'
    );
}

module.exports = Dictionary;

},{}],3:[function(require,module,exports){
Phonetics = function() {}

Phonetics.prototype.devanagariToLatin = function(input) {
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

module.exports = Phonetics;

},{}],4:[function(require,module,exports){



Popup = function() {

    this.shown = false;

    this.$popup = $('<div>');
    this.$popup.prop('id', '__easy-devanagari__');
    this.$popup.css({
        // 'display': 'none',
        'display': 'inline-block',
        'z-index': '99999',
        'position': 'fixed',
        'width': 'fit-content',
        'height': 'fit-content',

        // non-selectable and click through
        'user-select': 'none',
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-o-user-select': 'none',

        // styling
        'border-radius': '4px',
        'background-color': 'rgba(0, 0, 0, 0.63)',
        'color': '#fff',
        'font-size': '18px',
        'font-weight': 'bold',
        'font-family': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
        'padding': '6px 10px 8px',
        'line-height': '22px',

        // anim
        'transition': 'all 0.2s ease-in-out',
        'opacity': '0'
    });

    // Phonetics span
    let $span = $('<span id="__easy-devanagari-phonetics__">');
    $span.css({
        'user-select': 'text',
        '-moz-user-select': 'text',
        '-khtml-user-select': 'text',
        '-webkit-user-select': 'text',
        '-o-user-select': 'text',
    });
    $span.appendTo(this.$popup);

    // Translation span (dictionary lookup)
    let $spanTranslation = $('<span id="__easy-devanagari-translation__">');
    $spanTranslation.css({
        'padding-right': '6px'
    });
    $spanTranslation.appendTo(this.$popup);


    // Create speaker icon
    let $speaker = $('<img id="__easy-devanagari-speak__" src="'+chrome.runtime.getURL('speaker.png')+'">');
    $speaker.css({
        'padding': '0 0 0 1px',
        'width': 'auto',
        'height': '14px',
        'vertical-align': 'middle'
    });
    // hover animations
    $speaker.mouseenter(function() {
        $(this).css('filter', 'brightness(75%)');
    })
    $speaker.mouseleave(function() {
        $(this).css('filter', 'none');
    })


    // Create clipboard icon
    let $clipboard = $('<img id="__easy-devanagari-copy__" src="'+chrome.runtime.getURL('clipboard.png')+'">');
    $clipboard.css({
        'padding': '0 0 0 6px',
        'width': 'auto',
        'height': '15px',
        'vertical-align': 'middle'
    });
    // hover animations
    $clipboard.mouseenter(function() {
        $(this).css('filter', 'brightness(75%)');
    })
    $clipboard.mouseleave(function() {
        $(this).css('filter', 'none');
    })


    // add speaker and clipboard elements to popup, and popup to document body
    $speaker.appendTo(this.$popup);
    $clipboard.appendTo(this.$popup);
    this.$popup.appendTo(document.body);

    // pronounce text on click speaker
    document.getElementById("__easy-devanagari-speak__").addEventListener("click", function() {
        this.pronounce();
    }.bind(this));
    // copy selected text on click clipboard
    document.getElementById("__easy-devanagari-copy__").addEventListener("click", function() {
        this.copyTextToClipboard();
    }.bind(this));

}

/**
 * @param {Selection} selection
 */
Popup.prototype.show = function(text, rect) {

    // position and display popup
    let width = this.$popup.width() + 18 + 3;
    this.$popup.css({
        'top': this.getTop(rect)+'px',
        'left': (rect.x - 6)+'px',

        // anim
        'opacity': '1',
        'pointer-events': 'all',
    });
    this.shown = true;

    // phonetics
    let latin = g_devanagari.phonetics.devanagariToLatin(text);
    $('#__easy-devanagari__>span#__easy-devanagari-phonetics__').html(latin);

    // dictionary lookup
    g_devanagari.dictionary.displayDefinitions(latin);


};

/**
 * Hide popup.
 */
Popup.prototype.destroy = function() {
    this.$popup.css({'opacity': '0', 'pointer-events': 'none'});
    this.shown = false;
}

/**
 * Update position when scrolling.
 */
Popup.prototype.updatePosition = function() {
    if (!this.shown) return;
    let rect = document.getSelection().getRangeAt(0).getBoundingClientRect();
    this.$popup.css({
        'top': this.getTop(rect) + 'px'
    });
}

Popup.prototype.getTop = function(rect) { return (rect.y + 4 + rect.height); }


/**
 * Say the selected text.
 */
Popup.prototype.pronounce = function() {
    if (window.speechSynthesis.speaking) return;

    let text = $('#__easy-devanagari__>span#__easy-devanagari-phonetics__').text();
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'hi-IN';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
}

/**
 * Copy selected text to clipboard.
 */
Popup.prototype.copyTextToClipboard = function() {
    let text = $('#__easy-devanagari__>span#__easy-devanagari-phonetics__').text();
    navigator.clipboard.writeText(text).then(function() {}, function(err) {});
}

module.exports = Popup;

},{}]},{},[1]);
