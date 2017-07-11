'use strict';

module.exports = function(Member) {
    /*
     * Remote Methods
     */

    /*
     * Remote Hooks
     */
     require('../hooks/member/emailVerification')(Member);
     require('../hooks/member/resetPassword')(Member);
     require('../hooks/member/prepareContainer')(Member);
    /*
     * Listeners
     */

};
