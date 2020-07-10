let MessageBus = require('message-bus.js');
let Phonetics = require('phonetics.js');
let Dictionary = require('dictionary.js');
let Popup = require('popup.js');

// check if we are running as plugin
if ('undefined' === typeof noplugin) {
    noplugin = false;
    g_messageBus = new MessageBus(noplugin);
}


g_sanskrit = {
    'enabled': noplugin,
    'phonetics': new Phonetics(),
    'dictionary': new Dictionary(),
    'popup': new Popup(),
};





g_sanskrit.translateSelection = function() {

    // Make sure we didn't select the phonetics inside the popup
    let selection = document.getSelection();
    if (selection.rangeCount > 0 &&
        selection.getRangeAt(0).startContainer.parentNode.id === '__simply-sanskrit-phonetics__') {
        g_sanskrit.dictionary.displayDefinitions(selection.toString());
        return;
    }

    // Check if has selection and get bounding rectangle,
    // and make sure the selection wasn't too big
    let text = selection.toString();
    if (selection.rangeCount <= 0 || !text.length || text.length > 500) {
        g_sanskrit.popup.destroy();
        return;
    }

    // Show popup
    g_sanskrit.popup.show(text, selection.getRangeAt(0).getBoundingClientRect());

}





g_messageBus.addMessageListener((request, sender, callback) => {
    if (request.action !== 'show-roman') return;

    if ((g_sanskrit.enabled = request.showRoman)) {
        g_sanskrit.translateSelection();
    } else {
        g_sanskrit.popup.destroy();
    }

    callback();
});



document.addEventListener('selectionchange', () => {

    if (g_sanskrit.enabled)
        g_sanskrit.translateSelection();

});

document.addEventListener('scroll', () => {
    g_sanskrit.popup.updatePosition();
});
