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
