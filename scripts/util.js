'use strict';

var util = {
    getParameterByName : function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);

        if (results === null) {
            return "";
        }

        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
