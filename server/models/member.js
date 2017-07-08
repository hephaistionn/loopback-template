'use strict';

module.exports = function(Member) {
    /*
     * Actions (Remote Methods)
     */

    /*
     * Actions (Remote Hooks)
     */
     require('../hooks/member/emailVerification')(Member);
     require('../hooks/member/resetPassword')(Member);
     require('../hooks/member/prepareContainer')(Member);
    /*
     * Actions (Listeners)
     */

};
