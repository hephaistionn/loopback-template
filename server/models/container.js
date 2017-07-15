'use strict';

module.exports = function(Container) {
    /*
     * Remote Methods
     */
    require('../methods/container/upload')(Container);

    /*
     * Remote Hooks
     */
    /*
     * Listeners
     */

    Container.disableRemoteMethodByName('getContainers');
    Container.disableRemoteMethodByName('getContainer');
    Container.disableRemoteMethodByName('createContainer');
    Container.disableRemoteMethodByName('destroyContainer');
    Container.disableRemoteMethodByName('getFiles');
    Container.disableRemoteMethodByName('removeFile');
    Container.disableRemoteMethodByName('upload');
};
