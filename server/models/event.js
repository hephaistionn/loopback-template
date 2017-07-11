'use strict';

module.exports = function(Event) {
    /*
     * Remote Methods
     */
    require('../methods/event/uploadBanner')(Event);
    /*
     * Remote Hooks
     */
    require('../hooks/event/setOwner')(Event);
    /*
     * Listeners
     */
};
