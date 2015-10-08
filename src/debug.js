'use strict';

/**
 * @name Debug
 * @description static debugging utility.  To enable debug messages from browser session, simply add '?debug=1' or 'debug=true' to URL when loading any APMPlayer instance (enables console logging).  To disable Console + onScreen debug trace, use 'debug=all'.
 * @class
 */
var Debug = {
    /**
     * @name enabled
     * @description used to mark if debugging logs should output or not.  to enable, add ?debug=1 to URL when loading player.  by default, it logs to the console only; to enable a debug div, do debug=all
     * @default false
     * @fieldOf Debug
     */
    enabled : (util.getParameterByName('debug')) ? true : false,
    /**
     * @name consoleOnly
     * @description used to mark if debugging logs should output to console only; true by default.  use debug=all to log to both the console AND a helper div on screen.
     * @default true
     * @fieldOf Debug
     */
    consoleOnly : true,
    /**
     * @name log
     * @description writes to the log
     * @param {string} message the information to log
     * @param {string} type level of severity to log (see type)
     * @param {string} object_name optional object name to pass (if logging outside of APMPlayer -- APMPlayer_UI for instance)
     *
     * @methodOf Debug
     */
    log : function (message, type, object_name) {
        if (this.enabled === false) {
            return;
        }

        if (typeof object_name === 'undefined') {
            object_name = 'Starfighter';
        }

        if (typeof type === 'undefined') {
            type = this.type.info;
        }

        console.log(object_name + '::' + message + '[' + type.name + ']');
    },
    /**
     * @name type
     * @description object that holds the three different logging levels
     * @example
     * Debug.type.info
     * Debug.type.warn
     * Debug.type.error
     * @fieldOf Debug
     */
    type : {
        'info' : {'id' : 1, 'name' : 'info'},
        'warn' : {'id' : 2, 'name' : 'warning'},
        'error': {'id' : 3, 'name' : 'error'}
    }
};
