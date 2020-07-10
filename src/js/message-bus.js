/**
 * This class is a way to simulate the Chrome message bus so that the plugin can
 * function on the website without the user having it installed, but also when
 * it is installed as extension.
 */

MessageBus = function(noplugin) {
    this.noplugin = noplugin;

    this.commandListeners = [];
    this.messageListeners = [];

    if (noplugin) {
        chrome = { runtime: {} };
        chrome.runtime.getURL = function(path) {
            return SIMPLYSANSKRIT_PATH + '/plugin/' + path;
        }
    }
}

MessageBus.prototype.addCommandListener = function(callback) {
    if (this.noplugin) {
        this.commandListeners.push(callback);
    } else {
        chrome.commands.onCommand.addListener(callback);
    }
}

MessageBus.prototype.addMessageListener = function(callback) {
    if (this.noplugin) {
        this.messageListeners.push(callback);
    } else {
        chrome.runtime.onMessage.addListener(callback);
    }
}

MessageBus.prototype.sendMessage = function(request, callback) {
    if (this.noplugin) {
        this.messageListeners.forEach(listener => {
            listener(request, null, callback);
        });
    } else {
        chrome.runtime.sendMessage(request, callback);
    }
}




module.exports = MessageBus;
