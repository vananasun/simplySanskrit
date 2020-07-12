Util = {};

Util.BaseUrl = function() {
    let loc = window.location;
    return loc.protocol + "//" + loc.host + "/";
}

module.exports = Util;
