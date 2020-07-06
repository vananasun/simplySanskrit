Dictionary = function() {

}

/**
 * @param {string} word`
 */
Dictionary.prototype.lookupSanskrit = function(word) {

    chrome.runtime.sendMessage(
        { action: 'lookupSanskrit', 'word': word },
        function(response) {

            // Check whether it's the index page or the error page.
            // @TODO: check index page
            if (response.includes("Error: Can't find")
            ||  response.includes("Sanskrit Words Starting With")) {
                $('#__easy-devanagari__>span#translation').html(
                    '<br><i>'+
                    '(No definitions found)'+
                    '</i>'
                );
                return;
            }

            // Extract definitions
            const amountShown = 5;

            let html = '';
            let matches = response.match(/(?<=\<\/strong>\&mdash;)(.*?)  \&/g);
            let definitions = matches;
            for (let i = 0; i < Math.min(amountShown, definitions.length); i++) {
                definitions[i] = definitions[i].substring(0, definitions[i].length - 3);
                html += definitions[i] + '<br>';
            }

            // List definitions in popup
            $('#__easy-devanagari__>span#translation').html(
                '<br><i>'+
                html+
                '</i>'
            );

        }
    )


    // $.ajax({
    //     url: "https://sanskritdictionary.org/" + word,
    //     type: 'GET',
    //     success: function(data) {
    //         console.log(data);
    //     },
    // });


   // success: function(data){
   //     $('#content').html($(data).find('#content').html());
   // }
   //
   //

}

module.exports = Dictionary;
