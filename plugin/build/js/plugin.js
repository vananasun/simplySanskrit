latinShowed = false;


// Check for commands (hotkeys)
chrome.commands.onCommand.addListener(function(command) {
    // Don't bother with any command but the toggle latin hotkey
    if (command !== "toggle-show-latin") return;

    // Toggle wheter latin is displayed
    latinShowed = !latinShowed;

    // Send message to content script in current tab that we toggle latin
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        // console.log(tabs[0])
        chrome.tabs.sendMessage(
            tabs[0].id,
            {args: { 'show-latin': latinShowed }},
            function(response) {}
        );
    });

    return Promise.resolve('');

});

// Dictionary lookup handler
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action !== "lookupSanskrit") return;

        let word = request.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let url = "https://sanskritdictionary.org/" + encodeURIComponent(word);
        fetch(url)
            .then(r => { return r.text() })
            .then(d => {
                // console.log('response', d)
                sendResponse(d);
            })
            .catch(error => {/*console.warn(error)*/});

        return true; // will respond asynchronously
    }
);
