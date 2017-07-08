'use strict';

module.exports = function(Event) {
    /*
     * Actions (Remote Methods)
     */
    require('../methods/event/uploadBanner')(Event);
    /*
     * Actions (Remote Hooks)
     */
	//require('../hooks/event/create')(Event);
    /*
     * Actions (Listeners)
     */
};
