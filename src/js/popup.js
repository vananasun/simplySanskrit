


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
