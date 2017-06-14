'use strict';

module.exports = function(Event) {
    /*
     * Actions (Remote Methods)
     */
    require('../methods/event/top10')(Event);
    /*
     * Actions (Remote Hooks)
     */
	require('../hooks/event/create')(Event);
    /*
     * Actions (Listeners)
     */
};
