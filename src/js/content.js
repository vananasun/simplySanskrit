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
    // Check if has selection and get bounding rectangle
    let selection = document.getSelection();
    let text = selection.toString();
    if (!text.length) {
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
