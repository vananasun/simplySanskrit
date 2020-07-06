Popup = function() {


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
        // 'pointer-events': 'none',

        // styling
        'border': '5px solid #fff3',
        'border-radius': '4px',
        'background-color': '#0008',
        'color': '#fff',
        '-webkit-text-stroke': '1.1px #0003',
        'font-size': '18px',
        'font-weight': 'bold',
        'font-family': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
        'padding': '2px 6px',
        'line-height': '18px',

        // anim
        'transition': 'all 0.2s ease-in-out',
        'opacity': '0'
    });
    let $span = $('<span>');
    $span.css({
        'line-height': '18px',
        'vertical-align': 'top',
    })
    $span.appendTo(this.$popup);


    // Create speaker icon
    let $speaker = $('<img id="__easy-devanagari-speak__" src="'+chrome.runtime.getURL('speaker.png')+'">');
    $speaker.css({
        'padding': '3px 0px 0px 6px',
        'width': 'auto',
        'height': '14px',
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
        'padding': '3px 0px 0px 6px',
        'width': 'auto',
        'height': '15px',
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

    // Create popup
    let width = this.$popup.width() + 18 + 3;
    this.$popup.css({
        'top': this.getTop(rect)+'px',
        'left': (rect.x - 6)+'px',

        // anim
        'opacity': '1',
    });

    $('#__easy-devanagari__>span').html(g_devanagari.translator.devanagariToLatin(text));

};

/**
 * Hide popup.
 */
Popup.prototype.destroy = function() {
    this.$popup.css({'opacity': '0'});
}

/**
 * Update position when scrolling.
 */
Popup.prototype.updatePosition = function() {
    if (!document.getSelection().focusNode) return;
    let rect = document.getSelection().getRangeAt(0).getBoundingClientRect();
    this.$popup.css({
        'top': this.getTop(rect)+'px'
    });
}

Popup.prototype.getTop = function(rect) { return (rect.y + 4 + rect.height); }


/**
 * Say the selected text.
 */
Popup.prototype.pronounce = function() {
    let text = $('#__easy-devanagari__>span').text();
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'hi-IN';
    window.speechSynthesis.speak(msg);
}

/**
 * Copy selected text to clipboard.
 */
Popup.prototype.copyTextToClipboard = function() {
    let text = $('#__easy-devanagari__>span').text();
    navigator.clipboard.writeText(text).then(function() {}, function(err) {});
}

module.exports = Popup;
