'use strict';

module.exports = function(Member) {
    /*
     * Actions (Remote Methods)
     */

    /*
     * Actions (Remote Hooks)
     */
     require('../hooks/member/emailVerification')(Member);
    /*
     * Actions (Listeners)
     */

};
